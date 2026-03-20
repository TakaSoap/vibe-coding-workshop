#!/usr/bin/env python3
"""
Local dev server with live reload (python-livereload).

  python3 serve.py

Open http://127.0.0.1:8080/ — saving HTML/CSS/JS should refresh the browser.

Note: `python3 -m http.server` does NOT provide live reload; use this script instead.
"""
from livereload import Server

if __name__ == "__main__":
    server = Server()
    server.watch(".")
    server.serve(root=".", host="127.0.0.1", port=8080, open_url=False)
