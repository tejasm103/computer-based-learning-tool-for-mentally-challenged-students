"""
run_app.py - MindSpark Local Application Launcher
Starts a local HTTP server and automatically opens the user's default browser.
Requires only standard Python 3.3+ (no pip packages required).
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[{time.strftime('%H:%M:%S')}] {args[0]} - {args[1]}\n")

def find_available_port(start_port=8000, max_attempts=20):
    for p in range(start_port, start_port + max_attempts):
        try:
            with socketserver.TCPServer(("", p), Handler) as s:
                return p
        except OSError:
            continue
    return start_port

def open_browser(port):
    time.sleep(1.2)
    url = f"http://localhost:{port}"
    print(f"\n=======================================================")
    print(f" 🌟 MindSpark Learning Tool is running!")
    print(f" 🌐 URL: {url}")
    print(f" ⌨️  Press Ctrl + C in this terminal to stop the server.")
    print(f"=======================================================\n")
    webbrowser.open(url)

def main():
    os.chdir(DIRECTORY)
    port = find_available_port(PORT)

    # Start browser opener in background thread
    threading.Thread(target=open_browser, args=(port,), daemon=True).start()

    print(f"Starting MindSpark server on port {port}...")
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nMindSpark server stopped. Have a wonderful day!")

if __name__ == '__main__':
    main()
