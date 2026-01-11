def recommend_courses(interest_string, courses):
    if not interest_string:
        return []

    # split interests by comma
    interests = [
        i.strip().lower()
        for i in interest_string.split(",")
        if i.strip()
    ]

    recommended = []

    for c in courses:
        text = f"{c.title} {c.category}".lower()
        if any(interest in text for interest in interests):
            recommended.append(c)

    return recommended
