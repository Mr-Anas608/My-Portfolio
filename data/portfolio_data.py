def get_portfolio_data():
    """Returns all the portfolio data used in the application."""
    return {
        "services": [
            {
                "id": 1,
                "title": "Custom Data Solutions",
                "description": "Tailored scraping solutions built specifically for your unique data needs and business requirements.",
                "icon": "Settings",
                "delay": 0
            },
            {
                "id": 2,
                "title": "Real-time Social Media Insights",
                "description": "Monitor and extract valuable data from social platforms to gain competitive intelligence.",
                "icon": "BarChart3",
                "delay": 150
            },
            {
                "id": 3,
                "title": "Ready-to-Use Datasets",
                "description": "Pre-scraped and cleaned datasets available for immediate use in your research or business.",
                "icon": "Database",
                "delay": 300
            }
        ],
        
        "stats": [
            {
                "id": 1,
                "value": 125,
                "suffix": "+",
                "label": "Projects Completed",
                "delay": 0
            },
            {
                "id": 2,
                "value": 15,
                "suffix": "M+",
                "label": "Data Points Collected",
                "delay": 150
            },
            {
                "id": 3,
                "value": 98,
                "suffix": "%",
                "label": "Client Satisfaction",
                "delay": 300
            },
            {
                "id": 4,
                "prefix": "",
                "value": 24,
                "suffix": "/",
                "secondValue": 7,
                "label": "Support Available",
                "delay": 450
            }
        ],
        
        "portfolio_categories": [
            {"id": "all", "name": "All Projects"},
            {"id": "social-media", "name": "Social Media"},
            {"id": "e-commerce", "name": "E-commerce"},
            {"id": "custom", "name": "Custom Projects"}
        ],
        
        "portfolio_items": [
            {
                "id": 1,
                "title": "Instagram Engagement Analyzer",
                "description": "Automated tool to extract and analyze engagement metrics across influencer profiles.",
                "category": "social-media",
                "image": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "tags": ["Python", "Instagram API", "Data Visualization"]
            },
            {
                "id": 2,
                "title": "E-commerce Price Tracker",
                "description": "Real-time monitoring system for tracking product prices across multiple e-commerce platforms.",
                "category": "e-commerce",
                "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "tags": ["Selenium", "Beautiful Soup", "MongoDB"]
            },
            {
                "id": 3,
                "title": "News Sentiment Analyzer",
                "description": "News aggregation tool with real-time sentiment analysis for market intelligence.",
                "category": "custom",
                "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "tags": ["NLP", "Scrapy", "Flask API"]
            },
            {
                "id": 4,
                "title": "Twitter Trend Tracker",
                "description": "Real-time monitoring of trending topics and hashtags with geographic visualization.",
                "category": "social-media",
                "image": "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "tags": ["Twitter API", "D3.js", "FastAPI"]
            },
            {
                "id": 5,
                "title": "Amazon Review Analyzer",
                "description": "Tool for extracting and analyzing product reviews to identify sentiment and key feedback.",
                "category": "e-commerce",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "tags": ["Python", "NLTK", "Pandas"]
            },
            {
                "id": 6,
                "title": "Real Estate Market Analyzer",
                "description": "Comprehensive tool for scraping and analyzing real estate listings across multiple platforms.",
                "category": "custom",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "tags": ["Scrapy", "PostgreSQL", "Tableau"]
            }
        ],
        
        "process_steps": [
            {
                "id": 1,
                "title": "Requirement Analysis",
                "description": "I start with a thorough understanding of your data needs, target sources, and desired outputs to create a custom scraping strategy.",
                "icon": "ClipboardList",
                "position": "right"
            },
            {
                "id": 2,
                "title": "Custom Scraper Development",
                "description": "Building robust, efficient scrapers tailored to your specific target websites with error handling and rate limiting.",
                "icon": "Code",
                "position": "left"
            },
            {
                "id": 3,
                "title": "Data Collection & Cleaning",
                "description": "Executing the data extraction process with careful validation, cleaning, and formatting to ensure high-quality results.",
                "icon": "Filter",
                "position": "right"
            },
            {
                "id": 4,
                "title": "Analysis & Delivery",
                "description": "Transforming raw data into actionable insights through visualization, summary reports, and integration with your systems.",
                "icon": "BarChart",
                "position": "left"
            }
        ],
        
        "datasets": [
            {
                "id": 1,
                "title": "Top 100 Fashion Influencers",
                "description": "Comprehensive data on the top fashion influencers including engagement metrics and audience demographics.",
                "image": "https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "price": 129,
                "records": "10,000+ Records",
                "updates": "Updated Monthly",
                "bestSeller": True
            },
            {
                "id": 2,
                "title": "E-commerce Price Intelligence",
                "description": "Historical and current pricing data for popular product categories across major online retailers.",
                "image": "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "price": 199,
                "records": "50,000+ Records",
                "updates": "Weekly Updates",
                "bestSeller": False
            },
            {
                "id": 3,
                "title": "Research Publication Metadata",
                "description": "Academic research metadata including citations, authors, and institutions across multiple fields.",
                "image": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "price": 249,
                "records": "100,000+ Records",
                "updates": "Quarterly Updates",
                "bestSeller": False
            },
            {
                "id": 4,
                "title": "Tech Industry News",
                "description": "Structured data from technology news publications with sentiment analysis and topic classification.",
                "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "price": 179,
                "records": "Daily Updates",
                "updates": "API Access",
                "bestSeller": False
            },
            {
                "id": 5,
                "title": "Job Market Trends",
                "description": "Comprehensive job listing data including salaries, skills, and industry trends from major job boards.",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "price": 299,
                "records": "200,000+ Records",
                "updates": "Bi-weekly Updates",
                "bestSeller": False
            }
        ],
        
        "testimonials": [
            {
                "id": 1,
                "content": "Anas delivered a custom scraping solution that completely transformed our market research capabilities. The data accuracy and depth of information exceeded our expectations, and his ongoing support has been invaluable.",
                "author": "David Chen",
                "position": "Marketing Director, TechGrowth Inc.",
                "avatar": "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
                "id": 2,
                "content": "Working with Anas on our social media analytics project was a game-changer. His expertise in data extraction and processing saved us countless hours and provided insights we wouldn't have discovered otherwise.",
                "author": "Sarah Johnson",
                "position": "Social Media Manager, Brandburst",
                "avatar": "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
                "id": 3,
                "content": "The custom dataset Anas created for our research team provided exactly the data points we needed. His technical knowledge and attention to detail made the process smooth and the results exceeded our expectations.",
                "author": "Prof. Michael Tanner",
                "position": "Research Lead, University Research Group",
                "avatar": "https://randomuser.me/api/portraits/men/76.jpg"
            }
        ],
        
        "python_code_snippet": '''import requests
import json
import pandas as pd
from time import sleep
from bs4 import BeautifulSoup

class InstagramScraper:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.session = requests.Session()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    def login(self):
        """Authenticate with Instagram"""
        login_url = 'https://www.instagram.com/accounts/login/ajax/'
        
        # Get CSRF token
        response = self.session.get('https://www.instagram.com/')
        csrf = response.cookies['csrftoken']
        
        payload = {
            'username': self.username,
            'password': self.password,
        }
        
        login_response = self.session.post(
            login_url, 
            data=payload,
            headers={
                'X-CSRFToken': csrf,
                'Referer': 'https://www.instagram.com/'
            }
        )
        
        return login_response.json()['authenticated']

    def get_profile_data(self, target_username):
        """Extract data from a user profile"""
        url = f'https://www.instagram.com/{target_username}/'
        response = self.session.get(url, headers=self.headers)
        
        if response.status_code != 200:
            return {'error': f'Failed to retrieve profile: {response.status_code}'}
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find JSON data in the page
        scripts = soup.find_all('script')
        for script in scripts:
            if 'window._sharedData = ' in script.text:
                json_data = script.text.replace('window._sharedData = ', '').rstrip(';')
                data = json.loads(json_data)
                user_data = data['entry_data']['ProfilePage'][0]['graphql']['user']
                
                return {
                    'username': user_data['username'],
                    'full_name': user_data['full_name'],
                    'followers': user_data['edge_followed_by']['count'],
                    'following': user_data['edge_follow']['count'],
                    'posts_count': user_data['edge_owner_to_timeline_media']['count'],
                    'biography': user_data['biography'],
                    'profile_pic_url': user_data['profile_pic_url_hd'],
                    'is_private': user_data['is_private'],
                    'is_verified': user_data['is_verified'],
                }

    def get_recent_posts(self, target_username, limit=12):
        """Get recent posts data"""
        profile_data = self.get_profile_data(target_username)
        if 'error' in profile_data:
            return profile_data
            
        user_id = profile_data['user_id']
        posts_url = f'https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={{"id":"{user_id}","first":{limit}}}'
        
        response = self.session.get(posts_url, headers=self.headers)
        posts_data = response.json()
        
        posts = []
        for edge in posts_data['data']['user']['edge_owner_to_timeline_media']['edges']:
            node = edge['node']
            posts.append({
                'post_id': node['id'],
                'shortcode': node['shortcode'],
                'timestamp': node['taken_at_timestamp'],
                'likes': node['edge_liked_by']['count'],
                'comments': node['edge_media_to_comment']['count'],
                'caption': node['edge_media_to_caption']['edges'][0]['node']['text'] if node['edge_media_to_caption']['edges'] else '',
                'image_url': node['display_url'],
            })
            
        return posts

    def export_to_csv(self, data, filename):
        """Export data to CSV file"""
        df = pd.DataFrame(data)
        df.to_csv(filename, index=False)
        return f"Data exported to {filename}"

# Example usage
if __name__ == "__main__":
    scraper = InstagramScraper('username', 'password')
    
    if scraper.login():
        print("Login successful")
        
        # Get profile data
        profile = scraper.get_profile_data('target_account')
        print(f"Found profile with {profile['followers']} followers")
        
        # Get recent posts
        posts = scraper.get_recent_posts('target_account')
        print(f"Extracted {len(posts)} recent posts")
        
        # Export to CSV
        scraper.export_to_csv(posts, 'instagram_data.csv')
'''
    }