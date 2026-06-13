# Unsupervised Learning: Clustering

### Discovering Hidden Patterns in Unlabeled Data

Clustering is one of the most important techniques in unsupervised machine learning. It helps identify natural groupings within data without requiring predefined labels. In this topic, we explore K-Means, Gaussian Mixture Models (GMM), Expectation Maximization (EM), DBSCAN, HDBSCAN, and Hierarchical Clustering.

By the end of this topic, you will understand how clustering algorithms work, their mathematical foundations, implementation techniques, evaluation methods, and practical applications in real-world machine learning systems.

---

# What is Clustering?

Clustering is an unsupervised learning technique used to group similar data points together. Unlike supervised learning, where labeled data is available, clustering discovers hidden patterns from unlabeled datasets.

The goal of clustering is to maximize similarity within clusters while maximizing differences between clusters. Clustering is widely used in customer segmentation, recommendation systems, fraud detection, social network analysis, image segmentation, and bioinformatics.

Imagine organizing a library without category labels. You would naturally place similar books together based on topics, authors, or genres. Clustering algorithms perform a similar task automatically on datasets.

![Clustering Workflow Diagram](images/clustering-workflow.png)

**[Add image from ChatGPT or Internet]**

---

# Mathematical Formulation

## K-Means Objective Function

[
J = \sum_{i=1}^{k}\sum_{x \in C_i} ||x-\mu_i||^2
]

Where:

* (J) = Total clustering error
* (k) = Number of clusters
* (C_i) = Points belonging to cluster i
* (x) = Data point
* (\mu_i) = Cluster centroid

The objective is to minimize the distance between data points and their assigned cluster centroids.

---

## Gaussian Distribution

[
p(x)=\frac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}
]

Where:

* (x) = Observation
* (\mu) = Mean
* (\sigma^2) = Variance

This probability distribution forms the basis of Gaussian Mixture Models.

---

## Silhouette Score

[
s=\frac{b-a}{\max(a,b)}
]

Where:

* (a) = Average distance within cluster
* (b) = Average distance to nearest cluster

Higher values indicate better clustering quality.

---

# How It Works – Step by Step

## K-Means Clustering

1. Select the number of clusters (K).
2. Randomly initialize centroids.
3. Assign each point to the nearest centroid.
4. Update centroid positions.
5. Repeat until convergence.

### Example

Imagine placing delivery centers in a city. Houses are assigned to the nearest center, and centers continuously adjust their positions to minimize travel distance.

---

## Gaussian Mixture Models (GMM)

1. Assume data originates from multiple Gaussian distributions.
2. Initialize parameters.
3. Estimate cluster probabilities.
4. Update distribution parameters.
5. Repeat until convergence.

Unlike K-Means, GMM allows a data point to belong to multiple clusters with different probabilities.

---

## Expectation Maximization (EM)

### Expectation Step (E-Step)

Estimate the probability that each data point belongs to each cluster.

### Maximization Step (M-Step)

Update means, variances, and mixing coefficients using the estimated probabilities.

This process repeats until model parameters stabilize.

---

## DBSCAN

1. Select epsilon (eps) and minimum samples.
2. Identify dense regions.
3. Expand clusters from core points.
4. Label sparse points as noise.

DBSCAN is effective for arbitrary-shaped clusters and datasets containing outliers.

---

## HDBSCAN

1. Build a hierarchy of density-based clusters.
2. Measure cluster stability.
3. Automatically identify meaningful clusters.

HDBSCAN extends DBSCAN by handling clusters with varying densities.

---

## Hierarchical Clustering

1. Treat each point as an individual cluster.
2. Merge the closest clusters iteratively.
3. Build a dendrogram.
4. Cut the dendrogram to determine final clusters.

---

# Key Assumptions

| Algorithm    | Assumption                     | If Violated              |
| ------------ | ------------------------------ | ------------------------ |
| K-Means      | Spherical clusters             | Poor clustering results  |
| GMM          | Gaussian distributions         | Inaccurate probabilities |
| DBSCAN       | Similar density levels         | Missed clusters          |
| HDBSCAN      | Hierarchical density structure | Reduced stability        |
| Hierarchical | Meaningful distance metric     | Incorrect cluster merges |

---

# When to Use / When Not to Use

| Use When               | Avoid When                                          |
| ---------------------- | --------------------------------------------------- |
| Customer segmentation  | Labels already exist                                |
| Fraud detection        | Supervised prediction is required                   |
| Market basket analysis | Dataset is extremely large for hierarchical methods |
| Image segmentation     | Data lacks meaningful structure                     |
| Anomaly detection      | Fast real-time prediction is required               |

---

# Implementation Overview

| Aspect            | NumPy (From Scratch)      | Scikit-Learn  |
| ----------------- | ------------------------- | ------------- |
| Learning Value    | Excellent                 | Moderate      |
| Development Speed | Slow                      | Fast          |
| Flexibility       | High                      | Moderate      |
| Production Use    | Limited                   | Excellent     |
| Reliability       | Depends on implementation | Highly tested |

### Example Scikit-Learn Implementation

```python
from sklearn.cluster import KMeans

model = KMeans(n_clusters=3, random_state=42)
model.fit(X)

labels = model.labels_
```

---

# Top 5 Interview Questions

### 1. Why does K-Means struggle with non-spherical clusters?

**Answer Structure:**

* Uses Euclidean distance
* Assumes spherical clusters
* Centroid-based assignment
* Cannot model arbitrary shapes
* DBSCAN performs better

### 2. Difference between K-Means and GMM?

**Answer Structure:**

* Hard vs soft clustering
* Deterministic vs probabilistic
* Centroid-based vs distribution-based
* Overlapping cluster handling

### 3. Explain the EM Algorithm.

**Answer Structure:**

* Iterative optimization
* E-step estimates probabilities
* M-step updates parameters
* Maximizes likelihood

### 4. When should DBSCAN be preferred?

**Answer Structure:**

* Unknown cluster count
* Presence of noise
* Arbitrary cluster shapes
* Outlier detection requirements

### 5. What is a Dendrogram?

**Answer Structure:**

* Tree representation
* Visualizes cluster hierarchy
* Helps determine cluster count
* Used in hierarchical clustering

---

# References & Further Reading

1. Scikit-Learn Documentation
2. Pattern Recognition and Machine Learning – Christopher Bishop
3. Introduction to Statistical Learning (ISLR)
4. Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow
5. Kaggle Clustering Tutorials

---

# Quick Reference Table

| Item                   | Detail                                          |
| ---------------------- | ----------------------------------------------- |
| Learning Type          | Unsupervised Learning                           |
| Main Goal              | Group Similar Data                              |
| K-Means Parameter      | n_clusters                                      |
| GMM Parameter          | n_components                                    |
| DBSCAN Parameters      | eps, min_samples                                |
| HDBSCAN Parameter      | min_cluster_size                                |
| Hierarchical Parameter | linkage                                         |
| Evaluation Metrics     | Silhouette Score, Davies-Bouldin Index          |
| Common Applications    | Segmentation, Recommendation, Anomaly Detection |
| Major Challenge        | Selecting the right clustering algorithm        |
