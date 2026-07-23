import numpy as np

def cosine_similarity(vector1,vector2):
    dot_product=np.dot(vector1,vector2)
    magnitude1=np.linalg.norm(vector1)
    magnitude2=np.linalg.norm(vector2)
    if magnitude1==0  or magnitude2==0:
        return 0.0
    similarity=dot_product/(magnitude1*magnitude2)
    return float(similarity)