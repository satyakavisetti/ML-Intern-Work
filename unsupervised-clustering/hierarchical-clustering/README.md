# Hierarchical Clustering

> **Tagline:** Build a tree of nested clusters — and cut it wherever the data tells you to.

**What you will learn:** You will understand how both agglomerative (bottom-up) and divisive (top-down) approaches construct a full cluster hierarchy, how to read a dendrogram to choose the right number of clusters, and how linkage methods fundamentally shape the clusters you get.

---

## 1. What Is Hierarchical Clustering?

Hierarchical clustering builds a **nested tree of groupings** rather than a flat set of clusters. Every data point starts as its own group, and the algorithm progressively merges (or splits) them based on similarity until everything connects into one root. The result is a **dendrogram** — a branching diagram you can cut at any height to produce any number of clusters.

Think of it like a biological taxonomy tree. Every organism is its own species, but species group into genera, genera into families, families into orders, and so on up to kingdom. No one preset the number of groups — the hierarchy emerged from the relationships themselves.

There are two directions to build this tree:

**Agglomerative (bottom-up):** Start with every point as its own cluster. Repeatedly merge the two closest clusters until only one remains. This is by far the more common approach in practice.

**Divisive (top-down):** Start with all points in one cluster. Recursively split the most heterogeneous cluster until every point is alone. More computationally expensive and rarely used outside specialized domains like phylogenetics.

---

## 2. Mathematical Formulation

The core question at each merge step: *how far apart are two clusters?* The answer depends on the **linkage method** chosen.

| Linkage | Distance Formula | Behavior |
|---------|-----------------|----------|
| **Single** | `min dist(a, b)` for a∈A, b∈B | Nearest neighbors; creates elongated "chaining" clusters |
| **Complete** | `max dist(a, b)` for a∈A, b∈B | Farthest neighbors; creates compact, equal-sized clusters |
| **Average** | `(1/|A||B|) Σ dist(a,b)` | Mean pairwise distance; balanced between single and complete |
| **Ward** | `ΔJ = ‖μ_A − μ_B‖² · (|A|·|B|)/(|A|+|B|)` | Minimizes within-cluster variance at each merge; most widely used |

**Ward linkage significance:** Ward merges whichever two clusters increase total within-cluster sum of squares the least — identical in spirit to K-Means' objective. This makes Ward the go-to choice when you want compact, roughly spherical clusters.

| Symbol | Meaning |
|--------|---------|
| `A`, `B` | Two candidate clusters being considered for merging |
| `a`, `b` | Individual points from clusters A and B |
| `μ_A`, `μ_B` | Centroids of clusters A and B |
| `|A|`, `|B|` | Number of points in each cluster |
| `ΔJ` | Increase in within-cluster variance from merging |

---

## 3. How It Works – Step by Step

**Agglomerative (the standard path):**

1. **Compute the distance matrix** — Calculate pairwise distances between all N points. *(Like measuring the walking distance between every pair of cities on a map.)*

2. **Find the two closest clusters** — At the start, every point is its own cluster. Pick the pair with the smallest linkage distance. *(The two nearest cities.)*

3. **Merge them** — Combine those two clusters into one. Update the distance matrix to reflect distances from this new merged cluster to all others. *(The two cities become one metro area; recalculate distances from the metro to everyone else.)*

4. **Repeat** — Keep finding and merging the closest pair until a single root cluster remains. You now have the full hierarchy.

5. **Cut the dendrogram** — Draw a horizontal line at the height where you see the largest vertical gap (the longest branches before the cut). The number of vertical lines crossed = number of clusters. *(Cutting the taxonomy tree at "family" level gives you more groups than cutting at "kingdom.")*

> **Flow Diagram Placeholder**
> ![Hierarchical Clustering Dendrogram](./hierarchical_dendrogram.png)
> *[Add image from ChatGPT or Internet — showing a dendrogram with a horizontal cut line and resulting cluster coloring]*

**Divisive:** Reverse the process — start at the root and recursively split using a flat clustering algorithm (like K-Means with K=2) at each node until all points are singletons.

---

## 4. Key Assumptions

| Assumption | What Happens If Violated |
|------------|--------------------------|
| Distance metric is **meaningful** | Clustering reflects metric artifacts, not true similarity; choose metric carefully (cosine for text, Euclidean for spatial) |
| Data fits the **chosen linkage** | Single linkage on blob clusters → chaining; Ward on non-spherical clusters → poor splits |
| Dataset is **small to medium** (≤ 10k rows) | O(n²) memory and O(n² log n) time makes it impractical at scale |
| **No outliers** or they're acceptable | Single linkage is catastrophically sensitive to outliers; Ward is more robust |
| Features are on **comparable scales** | Euclidean distances are dominated by high-magnitude features; standardize first |

---

## 5. When to Use / When Not to Use

| ✅ Use Hierarchical Clustering When… | ❌ Avoid When… |
|--------------------------------------|---------------|
| You want to **explore the full cluster structure** without committing to K | Dataset has > 50,000 rows — O(n²) kills you |
| You need a **dendrogram** for visualization or reporting | You need hard real-time predictions |
| **K is unknown** and you want to decide post-hoc | Clusters are density-based or non-spherical (use DBSCAN) |
| Data has a **natural hierarchy** (taxonomy, org charts, phylogenetics) | You need probabilistic soft assignments (use GMM) |
| Small dataset where **interpretability** is paramount | Features are very high-dimensional without reduction |
| Gene expression, NLP document clustering, customer personas | Speed and scalability are production requirements |

---

## 6. Implementation Overview

### From Scratch vs. Library

| Aspect | From Scratch (NumPy/SciPy) | Scikit-Learn |
|--------|---------------------------|--------------|
| Distance matrix | Manual `scipy.spatial.distance.pdist` | Computed internally |
| Linkage computation | `scipy.cluster.hierarchy.linkage` | Built into `AgglomerativeClustering` |
| Dendrogram | `scipy.cluster.hierarchy.dendrogram` | Not built-in — use SciPy for visualization |
| Memory | Full O(n²) matrix | Same; use `connectivity` matrix to constrain |
| Best for | Dendrogram visualization + flexible metrics | Production cluster label assignment |

**Scikit-Learn Training Snippet:**

```python
from sklearn.cluster import AgglomerativeClustering
from sklearn.preprocessing import StandardScaler
import scipy.cluster.hierarchy as sch
import matplotlib.pyplot as plt

# Step 1: Scale — Ward linkage is variance-based, so scale matters
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 2 (optional but recommended): Plot dendrogram first to estimate K
linked = sch.linkage(X_scaled, method='ward')
plt.figure(figsize=(12, 5))
sch.dendrogram(linked, truncate_mode='lastp', p=30)
plt.axhline(y=7.0, color='red', linestyle='--')  # Cut line — adjust height visually
plt.title("Dendrogram — cut the red line to choose K")
plt.show()

# Step 3: Fit with chosen K
agg = AgglomerativeClustering(
    n_clusters=4,       # Chosen by reading the dendrogram
    metric='euclidean',
    linkage='ward'      # Ward minimizes within-cluster variance
)
labels = agg.fit_predict(X_scaled)

print(f"Cluster sizes: {dict(zip(*np.unique(labels, return_counts=True)))}")
```

> **Tip:** The best cut in a dendrogram is always just below the **longest vertical line** — that's where merging two clusters would cause the biggest jump in dissimilarity.

---

## 7. Top 5 Interview Questions

**Q1: What is the difference between agglomerative and divisive clustering?**
> Agglomerative is **bottom-up**: each point starts as its own cluster, and we iteratively merge the closest pair. Divisive is **top-down**: all points start in one cluster, recursively split. Agglomerative is O(n² log n); divisive is exponential in the worst case. Agglomerative dominates in practice.

**Q2: Why is Ward linkage the most commonly used?**
> Ward merges the pair of clusters that causes the **smallest increase in total within-cluster variance** — the same objective K-Means minimizes. This produces compact, roughly equal-sized, spherical clusters and tends to yield the most visually and practically interpretable dendrograms. Single and complete linkage are sensitive to outliers and shape respectively.

**Q3: How do you read a dendrogram to decide on K?**
> Look for the **longest horizontal gap** between two consecutive merge heights on the y-axis. Draw a horizontal cut just below that gap. Count how many vertical lines the cut crosses — that's your K. The intuition: a long gap means merging those two clusters would be a big leap in dissimilarity, so we stop just before it.

**Q4: What is the time and space complexity of agglomerative clustering?**
> Time: **O(n² log n)** with efficient algorithms (O(n³) naively). Space: **O(n²)** for the distance matrix. This is the hard ceiling — at ~50k points, the distance matrix alone exceeds several GB. For large datasets, mini-batch agglomerative or BIRCH is a practical alternative.

**Q5: How does hierarchical clustering differ from K-Means in practice?**
> K-Means is **faster** (O(nKI)) and scales to millions of points, but requires K upfront, assumes spherical clusters, and gives no structural insight. Hierarchical clustering is **slower** but produces a full tree you can interrogate at any resolution, requires no K upfront, and is the right tool when the hierarchy itself is the output of interest (e.g., gene expression analysis, customer journey mapping).

---

## 8. References & Further Reading

1. **Original Agglomerative Method** — Ward, J.H. (1963). *Hierarchical grouping to optimize an objective function.* [JSTOR](https://www.jstor.org/stable/2282967)
2. **Comprehensive Overview** — Murtagh & Contreras (2012). *Algorithms for hierarchical clustering: an overview.* [Link](https://wires.onlinelibrary.wiley.com/doi/10.1002/widm.53)
3. **Scikit-Learn Docs** — [sklearn.cluster.AgglomerativeClustering](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.AgglomerativeClustering.html)
4. **SciPy Dendrogram Guide** — [scipy.cluster.hierarchy](https://docs.scipy.org/doc/scipy/reference/cluster.hierarchy.html)
5. **Kaggle Notebook** — Hierarchical Clustering on Mall Customers: [Link](https://www.kaggle.com/code/datascientist97/hierarchical-clustering-on-mall-customers)

---

## 9. Quick Reference Table

| Item | Detail |
|------|--------|
| Algorithm type | Unsupervised / Hierarchical Clustering |
| Approaches | Agglomerative (bottom-up), Divisive (top-down) |
| Key hyperparameter | `n_clusters` (or dendrogram cut height) |
| Linkage methods | Single, Complete, Average, Ward |
| Most used linkage | Ward (minimizes within-cluster variance) |
| Output structure | Dendrogram (tree) + flat cluster labels |
| Cluster assignment | Hard (no soft probabilities) |
| K required upfront? | No — choose after viewing dendrogram |
| Time complexity | O(n² log n) agglomerative; O(n³) naive |
| Space complexity | O(n²) for distance matrix |
| Handles noise/outliers? | Poorly (especially single linkage) |
| Sklearn class | `sklearn.cluster.AgglomerativeClustering` |
| Dendrogram tool | `scipy.cluster.hierarchy.dendrogram` |
| Best dataset size | < 10,000–50,000 rows |
| Common alternatives | K-Means (speed), DBSCAN (noise), GMM (probabilistic) |
