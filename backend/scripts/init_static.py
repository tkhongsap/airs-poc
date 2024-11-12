import os
import shutil

def init_static():
    # Get the base directory
    base_dir = os.path.dirname(os.path.dirname(__file__))
    static_dir = os.path.join(base_dir, "static")
    
    # Create static directory if it doesn't exist
    if not os.path.exists(static_dir):
        os.makedirs(static_dir)
        print(f"Created static directory at {static_dir}")
    
    # Create a development index.html
    index_path = os.path.join(static_dir, "index.html")
    if not os.path.exists(index_path):
        with open(index_path, "w") as f:
            f.write("""
<!DOCTYPE html>
<html>
<head>
    <title>AIRS-POC Development</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f0f2f5;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>AIRS-POC Development Mode</h1>
        <p>Backend is running successfully!</p>
        <p>API Documentation: <a href="/docs">/docs</a></p>
    </div>
</body>
</html>
            """)
        print(f"Created development index.html at {index_path}")

if __name__ == "__main__":
    init_static() 