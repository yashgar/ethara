def calculate_match_score(user_skills, required_skills):
    if not required_skills:
        return 100.0

    user_skills_set = set([skill.lower() for skill in user_skills])
    required_skills_set = set([skill.lower() for skill in required_skills])

    matched_skills = user_skills_set.intersection(required_skills_set)

    score = (len(matched_skills) / len(required_skills_set)) * 100
    return round(score, 2)


def get_best_users_for_task(required_skills, all_users):
    """
    Takes a list of required skills and a list of user dictionaries.
    Returns a ranked list of recommended users.
    """
    recommendations = []

    for user in all_users:
        if user.get("role") == "Admin":
            continue

        user_skills = user.get("skills", [])
        match_score = calculate_match_score(user_skills, required_skills)

        if match_score > 0:
            recommendations.append({
                "username": user.get("username"),
                "skills": user_skills,
                "match_score": match_score
            })

    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    
    return recommendations