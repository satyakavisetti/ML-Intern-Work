# DBSCAN & HDBSCAN

> **Tagline:** Find clusters of any shape — and let the algorithm tell you what's noise.

**What you will learn:** You will understand how DBSCAN discovers clusters by density rather than distance to centroids, and how HDBSCAN extends that idea to handle clusters of varying density. You will also know how to apply both algorithms to anomaly detection in production scenarios.

---

## 1. What Is DBSCAN / HDBSCAN?

**DBSCAN** (Density-Based Spatial Clustering of Applications with Noise) groups points that are tightly packed together while explicitly labeling sparse, isolated points as **noise** (outliers). Unlike K-Means or GMM, you never specify K — the number of clusters emerges naturally from the data's density structure.

The real-world analogy: imagine dropping a city map on the table and circling "urban areas" based on how densely buildings are packed. You don't decide in advance how many cities exist — you just say "a neighborhood is urban if it has at least 5 buildings within 500 meters of each other." Anything left outside those urban zones is countryside (noise).

**HDBSCAN** (Hierarchical DBSCAN) is the modern evolution. Instead of requiring a fixed `eps` radius, it builds a full hierarchy of clusters at all density levels and then extracts the most stable ones. This makes it dramatically more robust when your clusters have different densities — a situation that breaks standard DBSCAN badly.

---

## 2. Mathematical Formulation

**Core concepts and definitions:**

**ε-neighborhood of a point** — the set of all points within distance `eps` of point `p`:

$$N_\varepsilon(p) = \{ q \in D \mid \text{dist}(p, q) \leq \varepsilon \}$$

**Core Point condition:**

$$|N_\varepsilon(p)| \geq \text{min\_samples}$$

A point `p` is a **core point** if at least `min_samples` points (including itself) fall within its ε-neighborhood.

**Reachability (HDBSCAN):**

$$d_{\text{reach}}(p, q) = \max\left(\text{core\_dist}_{k}(p),\ \text{core\_dist}_{k}(q),\ \text{dist}(p, q)\right)$$

where `core_dist_k(p)` is the distance from `p` to its *k*-th nearest neighbor.

| Symbol | Meaning |
|--------|---------|
| `ε (eps)` | Radius of the neighborhood around each point |
| `min_samples` | Minimum neighbors needed to be called a core point |
| `dist(p, q)` | Distance between points p and q (Euclidean by default) |
| `N_ε(p)` | All points within `eps` of point `p` |
| `core_dist_k(p)` | Distance to the *k*-th nearest neighbor of `p` |

**Point types:**
- **Core point** — has ≥ `min_samples` neighbors within `eps`
- **Border point** — within `eps` of a core point, but not a core point itself
- **Noise point** — neither core nor border; labeled `−1` in sklearn

---

## 3. How It Works – Step by Step

**DBSCAN:**

1. **Pick any unvisited point** — Mark it as visited. *(Like a health inspector starting their first restaurant block.)*

2. **Check its neighborhood** — If it has ≥ `min_samples` neighbors within `eps`, declare it a **core point** and start a new cluster.

3. **Expand the cluster** — Recursively add all density-reachable points: core points pull in their own neighbors, border points get added but don't expand further. *(Like a fire spreading block by block — only "hot" core blocks keep spreading.)*

4. **Label stragglers as noise** — Any point not reachable from any core point is marked as noise (`−1`). *(Isolated restaurants that don't belong to any district.)*

5. **Repeat** for all unvisited points until done.

**HDBSCAN extension:**

6. **Compute core distances** for all points at a chosen `min_cluster_size`.

7. **Build a minimum spanning tree** using mutual reachability distances.

8. **Extract the cluster hierarchy** — condense the tree into a dendrogram of cluster splits.

9. **Select the most stable clusters** from the hierarchy using excess of mass — automatically, no `eps` needed.

> **Flow Diagram Placeholder**
> ![DBSCAN Point Types and Cluster Expansion](./dbscan_flow.png)
> *[Add image from ChatGPT or Internet — showing core points, border points, noise, and the expansion wave]*

---

## 4. Key Assumptions

| Assumption | What Happens If Violated |
|------------|--------------------------|
| Clusters have **uniform density** | Varying-density clusters get merged or split incorrectly — use HDBSCAN |
| `eps` is **well-calibrated** | Too small: everything is noise. Too large: everything merges into one cluster |
| `min_samples` suits your data scale | Too high: legitimate clusters labeled noise; too low: noise absorbed into clusters |
| Distance metric is **meaningful** | In high dimensions, Euclidean distances become uninformative (curse of dimensionality) — reduce first |
| Clusters are **spatially separable** by density | Overlapping clusters with similar density cannot be distinguished |

---

## 5. When to Use / When Not to Use

| ✅ Use DBSCAN/HDBSCAN When… | ❌ Avoid When… |
|-----------------------------|---------------|
| Clusters have **arbitrary shapes** (rings, crescents, blobs) | Clusters are roughly spherical and similar in size |
| You need **automatic noise/outlier detection** | Every point must be assigned to a cluster |
| **K is unknown** and hard to estimate | Dataset is very large and speed is critical (DBSCAN is O(n log n) with indexing) |
| Clusters have **very different sizes** | High-dimensional data without prior dimensionality reduction |
| **Anomaly detection** in network traffic, fraud, sensor data | You need a probabilistic model or need to generate new samples |
| Geospatial clustering (GPS traces, delivery routes) | Cluster boundaries need to be smooth or Gaussian |

**Anomaly detection example:** Feed server log embeddings into HDBSCAN. Points labeled `−1` (noise) are unusual request patterns — potential intrusions. No need to pre-label attacks; the algorithm surfaces them purely from density.

---

## 6. Implementation Overview

### From Scratch vs. Library

| Aspect | From Scratch | Scikit-Learn / hdbscan library |
|--------|-------------|-------------------------------|
| Neighborhood query | Brute-force O(n²) distance matrix | KD-Tree or Ball Tree for O(n log n) |
| Cluster expansion | Manual BFS/DFS queue | Optimized C/Cython internals |
| HDBSCAN hierarchy | Manual MST + condensation | `hdbscan` library or `sklearn` ≥ 1.3 |
| Best for | Understanding the algorithm | Production, large datasets |

**Scikit-Learn Training Snippet:**

```python
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
import numpy as np

# Step 1: Scale features — eps is distance-sensitive
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 2: Fit DBSCAN
db = DBSCAN(
    eps=0.5,           # Neighborhood radius — tune with k-distance plot
    min_samples=5,     # Min neighbors to be a core point
    metric='euclidean',
    algorithm='auto'   # sklearn picks KD-Tree or Ball Tree automatically
)
db.fit(X_scaled)

# Step 3: Inspect results
labels = db.labels_                        # -1 = noise/anomaly
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise = np.sum(labels == -1)

print(f"Clusters found: {n_clusters}")
print(f"Anomalies (noise points): {n_noise} ({100*n_noise/len(labels):.1f}%)")

# Anomaly detection: extract outlier indices
anomalies = X[labels == -1]
```

> **Tuning tip:** Plot the *k-distance graph* — sort all points by their distance to the *k*-th nearest neighbor (k = `min_samples`). The "elbow" of that curve is a strong estimate for `eps`.

---

## 7. Top 5 Interview Questions

**Q1: What are core, border, and noise points?**
> A **core point** has ≥ `min_samples` neighbors within `eps` and is the engine of cluster expansion. A **border point** is within `eps` of a core point but doesn't have enough neighbors to be core itself — it joins the cluster but doesn't grow it. A **noise point** is reachable from no core point and gets label `−1` — it's an outlier.

**Q2: How do you choose `eps` and `min_samples`?**
> For `eps`: use the **k-distance plot** — compute each point's distance to its *k*-th nearest neighbor, sort, and look for the elbow. For `min_samples`: a rule of thumb is `2 × d` where `d` is the number of features, minimum 5. Domain knowledge always overrides heuristics.

**Q3: How does HDBSCAN improve over DBSCAN?**
> DBSCAN requires a single global `eps` — a value that works well for dense clusters may miss sparse ones, and vice versa. HDBSCAN replaces `eps` with **mutual reachability distance** and builds a full density hierarchy, then extracts the most stable clusters automatically. It handles **variable-density clusters** and needs only `min_cluster_size`.

**Q4: Why is DBSCAN good for anomaly detection?**
> Because outliers are structurally defined: any point that can't be connected to a dense region is labeled noise (`−1`). No separate anomaly model is needed — the clustering and anomaly detection happen simultaneously. This is powerful for fraud detection, network intrusion, or sensor fault detection where anomalies are definitionally sparse.

**Q5: What is DBSCAN's time complexity, and when does it struggle?**
> With a spatial index (KD-Tree, Ball Tree), DBSCAN runs in **O(n log n)**. It struggles in **high-dimensional spaces** because Euclidean distance becomes nearly uniform across all points (curse of dimensionality), making density meaningless. Always apply PCA or UMAP before running DBSCAN on data with more than ~20 features.

---

## 8. References & Further Reading

1. **Original DBSCAN Paper** — Ester et al. (1996). *A density-based algorithm for discovering clusters.* [Link](https://www.aaai.org/Papers/KDD/1996/KDD96-037.pdf)
2. **HDBSCAN Paper** — Campello et al. (2013). *Density-based clustering based on hierarchical density estimates.* [Link](https://link.springer.com/chapter/10.1007/978-3-642-37456-2_14)
3. **Scikit-Learn Docs** — [sklearn.cluster.DBSCAN](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html)
4. **HDBSCAN Library Docs** — [hdbscan.readthedocs.io](https://hdbscan.readthedocs.io/en/latest/how_hdbscan_works.html)
5. **Kaggle Notebook** — DBSCAN for Anomaly Detection in Credit Card Fraud: [Link](https://www.kaggle.com/code/shivamb/anomaly-detection-techniques-using-isolation-forest)

---

## 9. Quick Reference Table

| Item | Detail |
|------|--------|
| Algorithm type | Unsupervised / Density-Based Clustering |
| Key hyperparameters (DBSCAN) | `eps`, `min_samples` |
| Key hyperparameters (HDBSCAN) | `min_cluster_size`, `min_samples` |
| Cluster assignment | Hard (no probabilities in DBSCAN; soft scores in HDBSCAN) |
| Noise handling | Explicit — noise points labeled `−1` |
| Number of clusters | Determined automatically from data |
| Cluster shapes supported | Arbitrary (rings, blobs, crescents, filaments) |
| Time complexity | O(n log n) with spatial index; O(n²) brute force |
| High-dimensional data | Struggles — reduce dimensions first |
| Anomaly detection | Built-in via noise label `−1` |
| Sklearn class | `sklearn.cluster.DBSCAN`, `sklearn.cluster.HDBSCAN` (≥ 1.3) |
| Evaluation metrics | Silhouette Score, DBCV (density-based), visual inspection |
| Common alternatives | GMM, K-Means, Isolation Forest (for pure anomaly detection) |
