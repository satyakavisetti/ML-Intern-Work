# 🚀 Unsupervised Learning: Clustering

This repository contains the complete implementation of **Unsupervised Learning: Clustering** as part of the Gradient Technology Services (Gradientts) ML Internship.

The project covers clustering algorithms with:

- 📖 Theory explanations
- 🧮 Mathematical intuition
- 💻 Python implementations
- 📊 Visualizations
- 🔍 Algorithm comparisons

---

# 🎯 Project Objective

The main objective of this project is to understand how machines discover hidden patterns from unlabeled data.

After completing this project, we can:

✅ Understand clustering concepts  
✅ Implement clustering algorithms  
✅ Compare different approaches  
✅ Analyze cluster quality  
✅ Apply clustering to real-world problems  

---

# 📚 Topics Covered

This project includes:

1. 🔵 K-Means Clustering
2. 🟢 Gaussian Mixture Model (GMM) + EM Algorithm
3. 🟣 DBSCAN / HDBSCAN
4. 🟠 Hierarchical Clustering

---

# 📂 Repository Structure

```
ML-Intern-Work

│
├── README.md
│
└── unsupervised-clustering
    │
    ├── kmeans
    │   ├── README.md
    │   └── kmeans.ipynb
    │
    ├── gmm-em
    │   ├── README.md
    │   └── gmm-em.ipynb
    │
    ├── dbscan-hdbscan
    │   ├── README.md
    │   └── dbscan-hdbscan.ipynb
    │
    └── hierarchical-clustering
        ├── README.md
        └── hierarchical-clustering.ipynb
```

---

# 🔵 1. K-Means Clustering

📁 Folder:

```
unsupervised-clustering/kmeans
```

## 📖 Overview

K-Means is a centroid-based clustering algorithm that divides data into K groups.

Each cluster is represented by a center point called a centroid.

The algorithm groups similar data points by minimizing distance between points and centroids.

---

## ⚙️ Working Steps

1️⃣ Select number of clusters (K)

2️⃣ Initialize cluster centroids

3️⃣ Assign data points to nearest centroid

4️⃣ Update centroid values

5️⃣ Repeat until convergence

---

## 🧮 Mathematical Formulation

```
J = Σ ||xi - μk||²
```

Where:

- xi → Data point
- μk → Cluster centroid
- J → Clustering error

---

## ✅ Advantages

✔ Simple and easy to understand  
✔ Fast computation  
✔ Works well for large datasets  

## ❌ Limitations

✘ Need K value before training  
✘ Sensitive to outliers  
✘ Cannot detect complex shapes  

---

# 🟢 2. Gaussian Mixture Model + EM

📁 Folder:

```
unsupervised-clustering/gmm-em
```

## 📖 Overview

Gaussian Mixture Model is a probability-based clustering algorithm.

It calculates the probability of each data point belonging to different clusters.

---

## 🔄 EM Algorithm

Expectation Maximization contains two steps:

### 🔹 Expectation Step (E-Step)

Calculates probability of each point belonging to clusters.

### 🔹 Maximization Step (M-Step)

Updates:

- Mean
- Variance
- Cluster weights

The process repeats until convergence.

---

## ✅ Advantages

✔ Handles overlapping clusters  
✔ Gives probability information  
✔ More flexible than K-Means  

## ❌ Limitations

✘ Computationally expensive  
✘ Sensitive to initialization  

---

# 🟣 3. DBSCAN / HDBSCAN

📁 Folder:

```
unsupervised-clustering/dbscan-hdbscan
```

## 📖 Overview

DBSCAN is a density-based clustering algorithm.

It creates clusters based on dense regions and identifies noise points.

---

## 🔑 Important Concepts

### ⭐ Core Point

A point having enough nearby neighbors.

### ⭐ Border Point

A point close to a core point.

### ⭐ Noise Point

A point that does not belong to any cluster.

---

## 🚀 HDBSCAN

HDBSCAN improves DBSCAN by creating hierarchical density clusters.

It works well for datasets with different densities.

---

## ✅ Advantages

✔ Detects outliers  
✔ Finds irregular clusters  
✔ No need to specify number of clusters  

---

# 🟠 4. Hierarchical Clustering

📁 Folder:

```
unsupervised-clustering/hierarchical-clustering
```

## 📖 Overview

Hierarchical clustering creates a tree-like structure called a dendrogram.

It shows how clusters are formed step-by-step.

---

## Types

### 🔹 Agglomerative Clustering

Starts with individual points and merges clusters.

### 🔹 Divisive Clustering

Starts with one cluster and divides it.

---

## ✅ Advantages

✔ Easy visualization  
✔ Shows cluster relationships  

## ❌ Limitations

✘ Slow for large datasets  
✘ Sensitive to distance metrics  

---

# 📊 Algorithm Comparison

| Algorithm | Type | Noise Handling | Need K |
|---|---|---|---|
| K-Means | Centroid | ❌ | ✅ |
| GMM | Probability | ❌ | ✅ |
| DBSCAN | Density | ✅ | ❌ |
| HDBSCAN | Density | ✅ | ❌ |
| Hierarchical | Tree | Partial | ❌ |

---

# 📈 Evaluation Metrics

## ⭐ Silhouette Score

Measures how well separated clusters are.

Higher score means better clustering.

## ⭐ Davies-Bouldin Index

Measures similarity between clusters.

Lower score means better clustering.

---

# 💻 Technologies Used

🐍 Python  
📊 Pandas  
🔢 NumPy  
📈 Matplotlib  
🤖 Scikit-learn  
📒 Jupyter Notebook  
🧠 HDBSCAN  

---

# 🎤 Interview Questions

## 1. K-Means vs DBSCAN?

Answer points:

- K-Means uses centroid distance
- DBSCAN uses density
- DBSCAN detects noise
- K-Means requires K value


## 2. Explain EM Algorithm.

Answer points:

- E-Step calculates probabilities
- M-Step updates parameters
- Repeats until convergence


## 3. Why scaling is important?

Answer points:

- Clustering depends on distance
- Large features dominate results


---

# 📚 References

- Scikit-learn Documentation
- Introduction to Statistical Learning
- Hands-On Machine Learning


---

# 🎓 Learning Outcome

After completing this project:

✅ Understand unsupervised learning  
✅ Implement clustering algorithms  
✅ Compare clustering techniques  
✅ Choose suitable algorithms for real-world problems  


---

