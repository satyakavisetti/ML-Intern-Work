# 🤖 Unsupervised Learning: Clustering

## 📌 Introduction

This repository is about different clustering algorithms in Machine Learning.
Clustering is a part of unsupervised learning where we try to find similar
groups in data without already knowing the answers.

The main purpose of this project is to understand how different clustering
algorithms work, how they divide data into groups, and where they can be used
in real-life problems.

---

## 🔍 What is Clustering?

Clustering is a technique that groups similar data points together.

For example, an online shopping website can divide customers into groups based
on their shopping habits.

Here the system finds patterns by itself without any given labels.

---

# 📚 Topics Covered

## 1️⃣ K-Means Clustering

## 2️⃣ Gaussian Mixture Model (GMM) + EM Algorithm

## 3️⃣ DBSCAN & HDBSCAN

## 4️⃣ Hierarchical Clustering

---

# 📊 Algorithm Comparison

| Algorithm | Type | Needs Number of Clusters | Finds Outliers |
|---|---|---|---|
| K-Means | Centroid based | Yes | No |
| GMM | Probability based | Yes | Limited |
| DBSCAN | Density based | No | Yes |
| HDBSCAN | Density based | No | Yes |
| Hierarchical | Tree based | Optional | Limited |

---

# 🗂️ Project Structure


unsupervised-clustering/

├── kmeans/
│ ├── README.md
│ └── kmeans.ipynb

├── gmm-em/
│ ├── README.md
│ └── gmm_em.ipynb

├── dbscan-hdbscan/
│ ├── README.md
│ └── dbscan_hdbscan.ipynb

└── hierarchical-clustering/
├── README.md
└── hierarchical_clustering.ipynb


---

# 🚀 Applications

- 👥 Customer Segmentation
- 🛒 Recommendation Systems
- 🔎 Anomaly Detection
- 🖼️ Image Processing
- 📈 Market Analysis

---

# 🛠️ Technologies Used

- 🐍 Python
- 📓 Jupyter Notebook
- 🔢 NumPy
- 🐼 Pandas
- 📊 Matplotlib
- 🤖 Scikit-learn

---

# 🎯 Conclusion

Each clustering algorithm has different advantages.

K-Means is useful for simple grouping, GMM handles probability-based grouping,
DBSCAN identifies unusual patterns, and Hierarchical Clustering helps to
understand relationships between groups.

Choosing the correct algorithm depends on the dataset and problem requirement.

---

# 📖 References

- Scikit-learn Documentation
- Introduction to Statistical Learning
- Hands-On Machine Learning
- Kaggle Resources
