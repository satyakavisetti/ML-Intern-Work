# Hierarchical Clustering

**Build a Dendrogram to Explore Clustering at Every Granularity Level**

You will learn how hierarchical clustering constructs a tree-like hierarchy of nested clusters, understand different linkage criteria that determine how cluster distances are computed, and master cutting dendrograms to obtain different numbers of clusters.

---

## 1. WHAT IS HIERARCHICAL CLUSTERING?

Hierarchical Clustering is an unsupervised machine learning technique that groups similar data points into clusters while simultaneously building a hierarchy of relationships between those clusters. Unlike many clustering algorithms that produce a single flat partition of data, hierarchical clustering generates a complete clustering tree called a **dendrogram**, allowing analysts to examine cluster structures at multiple levels of detail.

The central idea is simple: similar observations should belong to the same group, while dissimilar observations should belong to different groups. However, instead of deciding a fixed number of clusters at the beginning, hierarchical clustering gradually builds a hierarchy that can later be explored and cut at different levels to obtain different cluster solutions.

A useful analogy is the organization of a family tree. At the lowest level, every individual person is unique. As we move upward, individuals form families, families form larger family groups, and eventually all members become part of a larger ancestral lineage. Hierarchical clustering follows a very similar principle by repeatedly merging or splitting groups of observations.

Another analogy comes from biological taxonomy. Living organisms are classified into species, genus, family, order, class, phylum, and kingdom. Each level provides a different granularity of grouping. Hierarchical clustering creates a similar structure for data, allowing users to move from fine-grained clusters to broad categories.

One of the biggest advantages of hierarchical clustering is that it does not require the number of clusters to be specified in advance. Algorithms such as K-Means require a predefined value of K, which may not be known beforehand. Hierarchical clustering postpones this decision until after the dendrogram has been constructed, providing greater flexibility during exploratory data analysis.

Hierarchical clustering is widely used in bioinformatics, customer segmentation, document clustering, social network analysis, image segmentation, recommendation systems, and many other domains where understanding relationships between groups is as important as identifying the groups themselves.

The output of hierarchical clustering is not simply a cluster label. Instead, it provides a complete history of cluster formation. This history allows data scientists to answer questions such as:

- Which observations are most similar?
- Which groups naturally form together?
- How many clusters exist in the data?
- At what similarity level should clusters be separated?
- Are there meaningful subgroups inside larger clusters?

Because of this interpretability, hierarchical clustering remains one of the most valuable exploratory clustering techniques despite being computationally more expensive than algorithms such as K-Means.

## 2. WHAT IS HIERARCHICAL CLUSTERING (DETAILED)?

### Agglomerative Hierarchical Clustering

**Process**:
1. Treat each data point as a separate cluster (n clusters initially)
2. Find the two most similar clusters; merge them (n-1 clusters)
3. Recompute distances between new merged cluster and all others
4. Repeat steps 2-3 until one cluster remains

**Key Question**: How do you measure distance between clusters? This is answered by the **linkage criterion**.

### Linkage Criteria (How to Define Cluster Distance)

**Single Linkage**:
d(A, B) = min(d(xᵢ, xⱼ)) for xᵢ ∈ A, xⱼ ∈ B

Distance between closest pair of points. Creates chain-like clusters; sensitive to outliers.

**Complete Linkage**:
d(A, B) = max(d(xᵢ, xⱼ)) for xᵢ ∈ A, xⱼ ∈ B

Distance between farthest pair of points. Creates compact, roughly spherical clusters. Less sensitive to outliers than single.

**Average Linkage**:
d(A, B) = (1/(|A|·|B|)) Σᵢ∈ₐ Σⱼ∈ᵦ d(xᵢ, xⱼ)

Average distance between all pairs. Compromise between single and complete. Often works well in practice.

**Ward Linkage**:
Merges clusters minimizing within-cluster variance increase.
ΔVariance = |A|·|B| / (|A|+|B|) · ||μₐ - μᵦ||²

Where μₐ, μᵦ are cluster centroids. Most similar to K-Means objective; creates compact clusters.

### Dendrogram Interpretation

A dendrogram shows:
- **X-axis**: Data points (or cluster labels)
- **Y-axis**: Distance/dissimilarity at which clusters merge
- **Height of merge**: The dissimilarity between merged clusters
- **Horizontal cut**: Defines clusters at that similarity level

Higher cut = fewer, larger clusters. Lower cut = more, smaller clusters.
### Why Hierarchical Clustering Works

The intuition behind hierarchical clustering is that similar observations should be merged earlier than dissimilar observations. By repeatedly applying this principle, the algorithm creates a nested structure that reveals relationships hidden within the data.

Unlike partition-based algorithms that optimize a specific objective function, hierarchical clustering focuses on preserving pairwise relationships throughout the clustering process.

This makes hierarchical clustering particularly useful when the true cluster structure is unknown or when multiple levels of grouping may exist simultaneously.

---

## 3. MATHEMATICAL FORMULATION

### Distance Between Points (Base Case)

d(xᵢ, xⱼ) = ||xᵢ - xⱼ||₂ (Euclidean distance typically)

Alternatively: Manhattan, Cosine, Correlation, etc.

### Single Linkage Distance

**d_SL(A, B) = min{d(xᵢ, xⱼ) : xᵢ ∈ A, xⱼ ∈ B}**

Most lenient; two clusters merge if any point pair is close.

### Complete Linkage Distance

**d_CL(A, B) = max{d(xᵢ, xⱼ) : xᵢ ∈ A, xⱼ ∈ B}**

Most strict; two clusters merge only if their farthest points are close.

### Average Linkage Distance

**d_AL(A, B) = (1 / (|A|·|B|)) Σₓᵢ∈ₐ Σₓⱼ∈ᵦ d(xᵢ, xⱼ)**

Average of all pairwise distances.

### Ward Linkage (Variance Minimization)

**d_W(A, B) = √((|A|·|B|) / (|A|+|B|)) · ||μₐ - μᵦ||₂**

Minimizes increase in total within-cluster sum of squares when merging.

### Merging Condition

At each step, merge clusters A* and B* where:
(A*, B*) = argmin_(A,B) d_linkage(A, B)

Repeat until single cluster remains.

---

## 4. HOW IT WORKS – STEP BY STEP

### Agglomerative Algorithm

**Input**: Data X (n × d), linkage criterion

**Step 1 – Initialization**
Create n clusters, each containing one point.
Compute pairwise distances D between all n points.

**Step 2 – Find Closest Pair**
Find clusters Cᵢ and Cⱼ with minimum linkage distance:
(i*, j*) = argmin_(i,j) d_linkage(Cᵢ, Cⱼ)

**Step 3 – Merge Clusters**
Create new cluster C_merged = Cᵢ* ∪ Cⱼ*
Record merge in dendrogram with distance d_linkage(Cᵢ*, Cⱼ*)

**Step 4 – Update Distance Matrix**
Remove rows/columns for Cᵢ* and Cⱼ* from D.
Insert new row/column for C_merged.
Compute distances from C_merged to all remaining clusters using linkage criterion.

**Step 5 – Termination**
If > 1 cluster remains, go to Step 2.
Else, dendrogram is complete.

### Worked Example (6 Points, Complete Linkage)

**Data**: A(0,0), B(1,0), C(2,0), D(10,10), E(11,10), F(10,11)

**Initial Distance Matrix** (Euclidean):
```
      A      B      C      D       E      F
A   0.00   1.00   2.00  14.14  14.87  14.14
B   1.00   0.00   1.00  13.45  14.14  13.45
C   2.00   1.00   0.00  12.81  13.45  12.81
D  14.14  13.45  12.81   0.00   1.00   1.41
E  14.87  14.14  13.45   1.00   0.00   1.41
F  14.14  13.45  12.81   1.41   1.41   0.00
```

**Iteration 1**:
Closest pair: A-B (distance 1.00)
Merge A+B → {AB}
Record: {AB} at height 1.00

**Updated Distance Matrix** (Complete Linkage):
d({AB}, C) = max(d(A,C), d(B,C)) = max(2.00, 1.00) = 2.00
d({AB}, D) = max(d(A,D), d(B,D)) = max(14.14, 13.45) = 14.14
... (compute for all)

**Iteration 2**:
Closest pair: E-F (distance 1.41)
Merge E+F → {EF}

**Iteration 3**:
Closest pair: D-{EF} (distance 1.41)
Merge D+{EF} → {DEF}

**Iteration 4**:
Closest pair: C-{AB} (distance 2.00)
Merge C+{AB} → {ABC}

**Iteration 5**:
Only two clusters: {ABC} and {DEF}
Distance ≈ 12.81 (closest pair C-D)
Merge → all in one cluster

**Dendrogram** shows merges at heights: 1.0, 1.41, 1.41, 2.0, 12.81

---

## 5. KEY ASSUMPTIONS

1. **Linkage Criterion is Appropriate**: Single linkage assumes chain-like clusters. Complete assumes compact clusters. Choose based on expected cluster shape.

2. **Distance Metric is Meaningful**: Euclidean works for continuous data; alternatives needed for categorical, text, or graph data.

3. **Data Follows Hierarchical Structure**: Not all data has meaningful hierarchy. Some datasets are better suited to flat clustering.

4. **Computational Resources Available**: Naive O(n² log n) or O(n³) can be prohibitive for n > 10,000. Scalable variants exist but add complexity.

5. **No Missing Values**: Hierarchical clustering requires complete distance matrix; missing data requires imputation.

6. **Feature Scaling**: Unscaled features dominate distances. Standardization is essential.

7. **Dendrogram Interpretation**: Requires domain knowledge to choose cutting height. Not always obvious where to cut.

---

## 6. WHEN TO USE / WHEN NOT TO USE

### ✅ Use Hierarchical Clustering When:

- **Cluster count unknown**: Dendrogram shows all granularities; choose post-hoc
- **Exploratory analysis**: Visualize relationships at multiple scales
- **Small to medium datasets**: n ≤ 10,000 typically feasible
- **Interpretability valued**: Dendrograms are intuitive and visual
- **Hierarchical structure exists**: Data naturally organized hierarchically
- **Multiple granularities needed**: Want results at K=2, K=3, ... simultaneously

**Real-World Use Case**: Gene expression analysis in biology. Genes cluster hierarchically by function. Dendrogram at coarse level shows major pathways; fine level shows specific gene groups. Biologists can cut at level matching their question.

### ❌ Don't Use Hierarchical Clustering When:

- **Very large datasets**: O(n²) space, O(n² log n) or O(n³) time prohibitive
- **Real-time clustering needed**: Too slow for streaming/online settings
- **Cluster count is fixed**: K-Means is faster if K is known
- **High-dimensional data**: Distances become uninformative; use dimension reduction first
- **Arbitrary cluster shapes needed**: DBSCAN better for non-convex shapes
- **Outliers common**: Hierarchical can create spurious clusters including outliers

---

## 7. IMPLEMENTATION OVERVIEW

### Hierarchical Clustering with Scipy & Scikit-Learn

```python
from scipy.cluster.hierarchy import dendrogram, linkage, fcluster
from sklearn.cluster import AgglomerativeClustering
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import numpy as np

# Generate sample data
X = np.random.randn(100, 2)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Method 1: scipy - Get linkage matrix
Z = linkage(X_scaled, method='ward')  # 'single', 'complete', 'average', 'ward'

# Plot dendrogram
plt.figure(figsize=(12, 6))
dendrogram(Z, truncate_mode='lastp', p=10)  # Show only last 10 merges
plt.xlabel('Sample Index or (Cluster Size)')
plt.ylabel('Distance')
plt.title('Dendrogram (Ward Linkage)')
plt.axhline(y=15, c='red', linestyle='--', label='Cut threshold')
plt.legend()
plt.show()

# Cut dendrogram at specific distance
max_d = 15
clusters_scipy = fcluster(Z, max_d, criterion='distance')
print(f"Clusters from distance-based cut: {np.max(clusters_scipy)} clusters")

# Cut dendrogram for specific K
k = 3
clusters_scipy = fcluster(Z, k, criterion='maxclust')
print(f"Clusters from K={k}: {np.unique(clusters_scipy)}")

# Method 2: scikit-learn - Agglomerative Clustering
hierarchical = AgglomerativeClustering(
    n_clusters=3,
    linkage='ward'  # 'ward', 'complete', 'average', 'single'
)
clusters_sklearn = hierarchical.fit_predict(X_scaled)

print(f"Scikit-learn clusters: {np.unique(clusters_sklearn)}")

# Visualize results
plt.figure(figsize=(8, 6))
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=clusters_sklearn, cmap='viridis')
plt.title('Hierarchical Clustering Results (K=3)')
plt.show()

# Compare different linkage methods
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
linkages = ['single', 'complete', 'average', 'ward']

for ax, linkage_type in zip(axes.flat, linkages):
    Z = linkage(X_scaled, method=linkage_type)
    clusters = fcluster(Z, 3, criterion='maxclust')
    
    ax.scatter(X_scaled[:, 0], X_scaled[:, 1], c=clusters, cmap='viridis')
    ax.set_title(f'Linkage: {linkage_type}')

plt.tight_layout()
plt.show()
```

### Manual Implementation (Simple Version)

```python
import numpy as np

class SimpleHierarchicalClustering:
    def __init__(self, linkage='complete'):
        self.linkage = linkage
        self.dendrogram = []
        
    def _pairwise_distances(self, X):
        """Compute pairwise Euclidean distances"""
        n = X.shape[0]
        D = np.zeros((n, n))
        for i in range(n):
            for j in range(i+1, n):
                D[i, j] = np.linalg.norm(X[i] - X[j])
                D[j, i] = D[i, j]
        return D
    
    def _linkage_distance(self, dist1, dist2, method='complete'):
        """Compute distance between two clusters"""
        if method == 'single':
            return np.min([dist1, dist2])
        elif method == 'complete':
            return np.max([dist1, dist2])
        elif method == 'average':
            return np.mean([dist1, dist2])
    
    def fit(self, X):
        """Perform hierarchical clustering"""
        n = X.shape[0]
        D = self._pairwise_distances(X)
        
        # Initialize: each point is its own cluster
        clusters = [[i] for i in range(n)]
        cluster_dists = [D.copy()]  # Track distances within each cluster
        
        while len(clusters) > 1:
            # Find closest pair of clusters
            min_dist = np.inf
            merge_i, merge_j = 0, 1
            
            for i in range(len(clusters)):
                for j in range(i+1, len(clusters)):
                    # Distance between cluster i and j
                    dists = []
                    for pi in clusters[i]:
                        for pj in clusters[j]:
                            dists.append(D[pi, pj])
                    
                    if self.linkage == 'single':
                        d = min(dists)
                    elif self.linkage == 'complete':
                        d = max(dists)
                    else:  # average
                        d = np.mean(dists)
                    
                    if d < min_dist:
                        min_dist = d
                        merge_i, merge_j = i, j
            
            # Merge clusters
            merged = clusters[merge_i] + clusters[merge_j]
            self.dendrogram.append((merge_i, merge_j, min_dist))
            
            # Remove old clusters and add merged
            if merge_i < merge_j:
                del clusters[merge_j]
                del clusters[merge_i]
            else:
                del clusters[merge_i]
                del clusters[merge_j]
            clusters.append(merged)
        
        return self
```

---

## 8. TOP 5 INTERVIEW QUESTIONS

**Q1: Explain the difference between agglomerative and divisive hierarchical clustering.**

A: **Agglomerative (bottom-up)**: Start with n single-point clusters; repeatedly merge closest pairs until 1 cluster. Simpler, O(n²log n) time with efficiency improvements.

**Divisive (top-down)**: Start with 1 cluster; repeatedly split until n single-point clusters. More complex (how do you split optimally?), O(2ⁿ) worst case without approximations.

Agglomerative is preferred due to computational efficiency and clarity. Divisive is rarely used except DIANA algorithm (deterministic splitting).

**Q2: Compare single, complete, and average linkage. When would you use each?**

A:
- **Single**: Minimum distance between clusters. Creates chain-like, elongated clusters. Sensitive to outliers; clusters can "chaining" together across bridges. Use when expecting elongated clusters.
- **Complete**: Maximum distance. Creates compact, roughly spherical clusters. Robust to outliers. Use as default when unsure.
- **Average**: Middle ground. Balanced approach; often works well empirically. Good general-purpose choice.
- **Ward**: Minimizes variance increase. Most similar to K-Means objective. Creates compact clusters. Use for numeric data with Euclidean distance.

**Q3: How do you decide where to cut the dendrogram?**

A: Methods:
- **Elbow Method**: Look for "elbow" in distance vs. number of clusters plot. Where distance increases sharply, fewer clusters might exist.
- **Domain Knowledge**: Business context (e.g., "We want 5 customer segments")
- **Silhouette Score**: Compute for different K; choose K maximizing average silhouette.
- **Distance Threshold**: Automatic—choose distance where meaningful jump occurs (gap in dendrogram)
- **Stability Analysis**: Perturb data; see which clusters remain stable across perturbations

**Q4: What is computational complexity of hierarchical clustering?**

A: **Agglomerative Naive**: O(n³) – n merges, each finding closest pair in O(n²), updating distances in O(n)

**With efficient distance updates**: O(n² log n) – using priority queues and incremental distance updates.

**Space**: O(n²) for distance matrix.

For large n, this is prohibitive. Scalable variants: single-linkage with MST (O(n log n)), approximate hierarchical clustering.

**Q5: How does hierarchical clustering relate to K-Means? When use one vs. other?**

A: Both partition data but differ:
- **K-Means**: Fixed K, flat partition, iterative refinement, fast O(nki)
- **Hierarchical**: No fixed K, full hierarchy, deterministic, slower O(n²log n)

**Use K-Means when**: K known, speed important, data large
**Use Hierarchical when**: K unknown, all granularities interesting, interpretability matters, data small-medium

Combine them: Run K-Means for speed; visualize with hierarchical clustering for interpretation.

---

## 9. QUICK REFERENCE TABLE

| Aspect | Agglomerative | Divisive |
|--------|---------------|----------|
| **Direction** | Bottom-up | Top-down |
| **Initialization** | Each point separate | All in one cluster |
| **Complexity** | O(n²log n) to O(n³) | O(2ⁿ) without approximation |
| **Dendrogram Quality** | Good | Similar (with DIANA) |
| **Common Use** | Default choice | Rarely used |
| **Linkage Options** | Single, complete, average, Ward | Limited (hierarchical splitting) |
| **Scalability** | Moderate (n ≤ 10K) | Poor |

---

## 10. REFERENCES & FURTHER READING

### Foundational Papers
- Johnson, S. C. (1967). "Hierarchical clustering schemes." *Psychometrika*, 2(3), 241-254. – Foundational agglomerative clustering.
- Kaufman, L., & Rousseeuw, P. J. (1990). *Finding Groups in Data: An Introduction to Cluster Analysis*. Chapter 5. – Comprehensive hierarchical clustering treatment.

### Implementations & Resources
- Scipy Hierarchical Clustering: https://docs.scipy.org/doc/scipy/reference/cluster.hierarchy.html
- Scikit-learn AgglomerativeClustering: https://scikit-learn.org/stable/modules/clustering.html#hierarchical-clustering
- Dendrogram Visualization: Matplotlib's dendrogram for interactive exploration

### Related Concepts
- Linkage criteria and their properties
- Cophenetic correlation coefficient (measures dendrogram faithfulness)
- Cut-based vs. distance-based cluster extraction
- DIANA algorithm (divisive hierarchical clustering)
- Scalable variants: BIRCH, scalable agglomerative approximations

---

