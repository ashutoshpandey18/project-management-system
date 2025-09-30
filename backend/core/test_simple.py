"""
SIMPLE TEST - This will definitely work
"""
from django.test import TestCase

class SimpleTest(TestCase):
    def test_one_plus_one(self):
        self.assertEqual(1 + 1, 2)
        print("🎉 FIRST TEST PASSED! 1+1=2")

    def test_django_works(self):
        from django.conf import settings
        self.assertTrue(hasattr(settings, 'DATABASES'))
        print("🎉 Django settings are loaded!")

    def test_string_contains(self):
        self.assertIn("test", "this is a test string")
        print("🎉 String test passed!")