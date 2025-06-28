-- Insert sample achievements
INSERT INTO public.achievements (name, description, requirement_type, requirement_value) VALUES
('First Post', 'Shared your first story with the community', 'posts_count', 1),
('Week Warrior', 'Active for 7 consecutive days', 'days_active', 7),
('Supporter', 'Liked 50 affirmations', 'likes_count', 50),
('Inspiration', 'Received 100 likes on your posts', 'post_likes_received', 100),
('Affirmation Creator', 'Created 10 affirmations', 'affirmations_created', 10),
('Community Builder', 'Made 25 comments', 'comments_count', 25);

-- Insert sample resources
INSERT INTO public.resources (title, description, type, author, url, image_url, read_time, rating, is_featured) VALUES
('The Science of Body Positivity: How Self-Acceptance Improves Mental Health', 'Explore the psychological research behind body positivity and its impact on overall well-being and mental health.', 'articles', 'Dr. Sarah Williams', '#', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop', '8 min read', 4.8, true),
('Body Neutrality vs Body Positivity: Finding Your Path', 'Understanding the difference between body neutrality and body positivity, and how to choose the approach that works for you.', 'videos', 'Maya Johnson', '#', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop', '12 min watch', 4.9, false),
('Mindful Eating and Body Acceptance', 'Learn how mindful eating practices can help you develop a healthier relationship with food and your body.', 'podcasts', 'The Body Love Podcast', '#', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop', '45 min listen', 4.7, false),
('Overcoming Negative Self-Talk: A Practical Guide', 'Practical strategies and techniques to identify, challenge, and replace negative self-talk with compassionate inner dialogue.', 'articles', 'Dr. Michael Chen', '#', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop', '6 min read', 4.6, false),
('Building Confidence Through Movement', 'Discover how different forms of movement and exercise can boost your confidence and improve your relationship with your body.', 'videos', 'FitJoy Movement', '#', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=250&fit=crop', '15 min watch', 4.8, true),
('The Role of Social Media in Body Image', 'An in-depth discussion about how social media affects body image and strategies for creating a positive online environment.', 'podcasts', 'Digital Wellness Show', '#', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop', '38 min listen', 4.5, false);

-- Insert sample affirmations
INSERT INTO public.affirmations (content, category, image_url, is_featured) VALUES
('I am worthy of love and respect exactly as I am.', 'self-worth', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', true),
('My body is my home, and I treat it with kindness and compassion.', 'body', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', false),
('I celebrate my unique beauty and embrace what makes me different.', 'confidence', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', false),
('I am healing and growing stronger every day.', 'healing', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', false),
('My worth is not determined by my appearance - I am valuable beyond measure.', 'self-worth', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop', true),
('I choose to speak to myself with the same kindness I show my best friend.', 'healing', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop', false),
('Every part of me deserves love and acceptance.', 'body', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', false),
('I am more than my appearance - I am whole and complete.', 'confidence', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop', false);
