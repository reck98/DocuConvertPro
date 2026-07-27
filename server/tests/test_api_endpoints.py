import unittest
import urllib.request
import urllib.parse
import json

BASE_URL = "http://localhost:5000"

class TestServerApiEndpoints(unittest.TestCase):

    def test_01_healthcheck(self):
        url = f"{BASE_URL}/health"
        req = urllib.request.urlopen(url)
        self.assertEqual(req.status, 200)
        data = json.loads(req.read().decode())
        self.assertEqual(data["status"], "ok")

    def test_02_robots_txt(self):
        url = f"{BASE_URL}/robots.txt"
        req = urllib.request.urlopen(url)
        self.assertEqual(req.status, 200)
        text = req.read().decode()
        self.assertIn("User-agent: *", text)
        self.assertIn("Sitemap:", text)

    def test_03_sitemap_xml(self):
        url = f"{BASE_URL}/sitemap.xml"
        req = urllib.request.urlopen(url)
        self.assertEqual(req.status, 200)
        text = req.read().decode()
        self.assertIn("<?xml", text)
        self.assertIn("<urlset", text)
        self.assertIn("/word-to-pdf</loc>", text)

    def test_04_engine_status(self):
        url = f"{BASE_URL}/api/engine-status"
        req = urllib.request.urlopen(url)
        self.assertEqual(req.status, 200)
        data = json.loads(req.read().decode())
        self.assertTrue(data["available"])
        self.assertEqual(data["totalTools"], 34)

if __name__ == "__main__":
    unittest.main()
