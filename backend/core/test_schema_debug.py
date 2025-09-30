"""
SCHEMA DEBUG - Discover what mutations are available
"""
from django.test import TestCase
from graphene.test import Client
from core.schema import schema

class TestSchemaDebug(TestCase):
    """Debug GraphQL schema to see available mutations"""

    def test_available_mutations(self):
        """Discover all available mutations"""
        query = '''
            query {
                __schema {
                    mutationType {
                        fields {
                            name
                            args {
                                name
                                type {
                                    name
                                    kind
                                }
                            }
                        }
                    }
                }
            }
        '''

        client = Client(schema)
        result = client.execute(query)

        print("=== AVAILABLE MUTATIONS ===")
        if 'data' in result and result['data']:
            mutations = result['data']['__schema']['mutationType']['fields']
            for mutation in mutations:
                print(f"\n🔧 {mutation['name']}:")
                for arg in mutation['args']:
                    print(f"   - {arg['name']}: {arg['type']['name']} ({arg['type']['kind']})")
        else:
            print("❌ Could not fetch mutations")
            print("Result:", result)

    def test_available_queries(self):
        """Discover all available queries"""
        query = '''
            query {
                __schema {
                    queryType {
                        fields {
                            name
                        }
                    }
                }
            }
        '''

        client = Client(schema)
        result = client.execute(query)

        print("\n=== AVAILABLE QUERIES ===")
        if 'data' in result and result['data']:
            queries = result['data']['__schema']['queryType']['fields']
            for query in queries:
                print(f"🔍 {query['name']}")