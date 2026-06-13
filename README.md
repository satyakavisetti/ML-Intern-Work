# Unsupervised Learning: Clustering

## Introduction

This repository is about different clustering algorithms in Machine Learning.
Clustering is a part of unsupervised learning where we try to find similar
groups in data without already knowing the answers.

The main purpose of this project is to understand how different clustering
algorithms work, how they divide data into groups, and where they can be used
in real-life problems.

---

## What is Clustering?

Clustering is a technique that groups similar data points together.

For example, an online shopping website can divide customers into groups based
on their shopping habits. Some customers may buy frequently, some may buy rarely,
and some may spend more money.

Here the system finds patterns by itself without any given labels.

---

# Topics Covered

## 1. K-Means Clustering

K-Means is one of the most commonly used clustering algorithms.

It creates groups by finding the center point of each cluster. These center
points are called centroids.

The algorithm keeps updating the centroids and assigning data points until the
clusters become stable.

### Steps:

- Select the number of clusters
- Choose initial centroids
- Assign points to the nearest centroid
- Update centroid positions
- Repeat the process until there is no major change

### Uses:

- Customer grouping
- Image compression
- Data analysis

---

## 2. Gaussian Mixture Model (GMM) + EM Algorithm

GMM is a clustering method based on probability.

Instead of saying a data point belongs only to one cluster, it calculates the
probability of that point belonging to different clusters.

The EM algorithm improves the model in two steps:

### Expectation Step

Finds how much each point belongs to each cluster.

### Maximization Step

Updates the cluster information using those probabilities.

### Uses:

- Pattern recognition
- Anomaly detection
- Data modelling

---

## 3. DBSCAN and HDBSCAN

DBSCAN is a density-based clustering algorithm.

It creates clusters by finding areas where many points are close together.
It can also identify points that do not belong to any group.

Important terms:

**Core Point:**  
A point that has enough nearby points.

**Border Point:**  
A point near a cluster but with fewer neighbours.

**Noise Point:**  
A point that does not fit into any cluster.

HDBSCAN is an improved version that works better when clusters have different
densities.

### Uses:

- Fraud detection
- Finding unusual data
- Location based analysis

---

## 4. Hierarchical Clustering

Hierarchical clustering creates clusters in the form of a tree structure.

This tree is called a dendrogram. It shows how clusters are connected with each
other.

There are two approaches:

### Agglomerative

Starts with small groups and combines them.

### Divisive

Starts with one big group and splits it.

### Uses:

- Document grouping
- Biological data analysis
- Research data analysis

---

# Comparison Between Algorithms

| Algorithm | Type | Needs Number of Clusters | Finds Outliers |
|---|---|---|---|
| K-Means | Centroid based | Yes | No |
| GMM | Probability based | Yes | Limited |
| DBSCAN | Density based | No | Yes |
| HDBSCAN | Density based | No | Yes |
| Hierarchical | Tree based | Optional | Limited |

---

# Project Structure


unsupervised-clustering/

├── kmeans/
│ ├── README.md
│ └── kmeans.ipynb
│
├── gmm-em/
│ ├── README.md
│ └── gmm_em.ipynb
│
├── dbscan-hdbscan/
│ ├── README.md
│ └── dbscan_hdbscan.ipynb
│
└── hierarchical-clustering/
├── README.md
└── hierarchical_clustering.ipynb


---

# Applications

Clustering is used in:

- Customer segmentation
- Recommendation systems
- Detecting unusual activities
- Image processing
- Market analysis

---

# Conclusion

In this project, different clustering algorithms are explored and implemented.

Each algorithm has its own advantages. K-Means is simple and fast, GMM handles
probability-based grouping, DBSCAN finds unusual patterns, and Hierarchical
Clustering helps in understanding relationships between groups.
