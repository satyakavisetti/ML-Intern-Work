# Unsupervised Learning: Clustering

## What You Will Learn

This repository covers the major clustering algorithms used in Machine Learning:
K-Means, Gaussian Mixture Models with Expectation Maximization, DBSCAN/HDBSCAN,
and Hierarchical Clustering.

You will learn the intuition, mathematics, implementation approaches,
real-world applications, and comparison between different clustering methods.

---

# What is Clustering?

Clustering is an unsupervised machine learning technique that groups similar
data points together without using predefined labels.

It helps discover hidden patterns and structures inside data.

Example:
A shopping company can group customers based on purchasing behaviour:
- frequent buyers
- occasional buyers
- high-value customers

---

# Algorithms Covered

## 1. K-Means Clustering

K-Means divides data into K groups by assigning points to the nearest cluster
center and repeatedly updating cluster centers.

### Concepts:
- Centroids
- Distance calculation
- Cluster assignment
- Iterative optimization

Notebook:
`07-clustering/kmeans/kmeans.ipynb`

---

## 2. Gaussian Mixture Model (GMM) + EM Algorithm

GMM assumes data is generated from a mixture of multiple probability
distributions.

The EM algorithm improves the model by repeatedly performing:

- Expectation step
- Maximization step

Concepts:
- Probability-based clustering
- Soft assignments
- Maximum likelihood estimation

Notebook:
`07-clustering/gmm-em/gmm_em.ipynb`

---

## 3. DBSCAN and HDBSCAN

Density-based clustering methods that create clusters based on dense regions
of data.

Advantages:
- Finds irregular shaped clusters
- Detects noise/outliers
- Does not require number of clusters beforehand

Concepts:
- Core points
- Border points
- Noise points
- Density reachability

Notebook:
`07-clustering/dbscan-hdbscan/dbscan_hdbscan.ipynb`

---

## 4. Hierarchical Clustering

Creates a tree-like structure of clusters called a dendrogram.

Two approaches:

- Agglomerative clustering
- Divisive clustering

Concepts:
- Distance metrics
- Linkage methods
- Dendrogram visualization

Notebook:
`07-clustering/hierarchical-clustering/hierarchical_clustering.ipynb`

---

# Algorithm Comparison

| Algorithm | Cluster Type | Needs K value | Handles Noise | Approach |
|---|---|---|---|---|
| K-Means | Spherical clusters | Yes | No | Centroid based |
| GMM | Overlapping clusters | Yes | No | Probability based |
| DBSCAN | Arbitrary shape | No | Yes | Density based |
| HDBSCAN | Variable density | No | Yes | Advanced density based |
| Hierarchical | Nested clusters | No | Limited | Tree based |

---

# Real World Applications

- Customer segmentation
- Image compression
- Fraud detection
- Anomaly detection
- Recommendation systems
- Market analysis

---

# Repository Structure
