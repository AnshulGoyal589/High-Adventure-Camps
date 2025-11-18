-- Sample data for testing (run manually in MongoDB)
-- Use MongoDB Compass or Mongosh to insert these documents

-- Sample Tour
db.tours.insertOne({
  "title": "Rohanth Pass Trek",
  "description": "Experience the stunning 5-day trek to Rohanth Pass with breathtaking views of the Himalayas. This moderately difficult trek is perfect for adventure enthusiasts.",
  "type": "Trekking",
  "location": "Manali",
  "duration": { "days": 5, "nights": 4 },
  "price": 15000,
  "groupSize": { "min": 2, "max": 20 },
  "difficulty": "moderate",
  "itinerary": [
    "Day 1: Arrival and acclimatization",
    "Day 2: Trek to base camp",
    "Day 3: Trek to Rohanth Pass",
    "Day 4: Return trek",
    "Day 5: Departure"
  ],
  "highlights": [
    "Stunning mountain views",
    "Alpine meadows",
    "Snow-capped peaks",
    "Traditional villages"
  ],
  "includeItems": [
    "Professional guide",
    "Accommodation",
    "Meals",
    "Trek support"
  ],
  "excludeItems": [
    "Travel to Manali",
    "Personal insurance",
    "Souvenirs"
  ],
  "seasonalAvailability": [5, 6, 7, 8, 9],
  "images": ["https://via.placeholder.com/600x400"],
  "featured": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
});

-- Sample Activity
db.activities.insertOne({
  "title": "Rock Climbing Experience",
  "description": "Challenge yourself with our guided rock climbing experience. Suitable for beginners to intermediate climbers with professional instruction.",
  "type": "Rock Climbing",
  "duration": 4,
  "price": 3000,
  "location": "Manali",
  "difficulty": "moderate",
  "maxParticipants": 8,
  "includes": [
    "All climbing equipment",
    "Professional instructor",
    "Safety briefing",
    "Snacks"
  ],
  "images": ["https://via.placeholder.com/600x400"],
  "featured": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
});

-- Sample Activity
db.activities.insertOne({
  "title": "Paragliding Adventure",
  "description": "Soar above the Himalayas with our tandem paragliding experience. Capture stunning aerial views of Manali and surrounding valleys.",
  "type": "Paragliding",
  "duration": 3,
  "price": 5000,
  "location": "Manali",
  "difficulty": "easy",
  "maxParticipants": 6,
  "includes": [
    "Tandem flight",
    "Equipment",
    "Certified pilot",
    "Photo/video service"
  ],
  "images": ["https://via.placeholder.com/600x400"],
  "featured": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
});
