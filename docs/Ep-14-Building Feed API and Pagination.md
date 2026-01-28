# Notes

Building Feed API and Pagination
=================================

# Thought process of API - /user/feed
- User must not see his own profile
- User must not see anyone whom he already has a connection (entry in connection request table)

# Pagination
- Mongo DB achieves pagination using skip() & limit() functions
- For eg.
    /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
    /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
    /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

    skip = (page - 1) * limit
