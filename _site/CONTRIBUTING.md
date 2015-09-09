## How to add a new course

- Add a new `.md` file under the courses folder.
- Add a new folder under the `courses/` folder where later you will add the course lessons.

## How to add a new lesson to an existing course

- Look for the course folder.
- Add a `.md` file within that folder following the current name pattern.
- Be sure you don't create a `.md` from scratch. Better if you start duplicating an existing ```.md``` (like [this one](https://raw.githubusercontent.com/CartoDB/academy/master/courses/01-beginners-course/lesson-1.md))

## Course variables

```
layout: course
title:
id:
subtitle:
categories:
tag:
time:
description_short:
description_long:
prerequisite:
  -
  -
  -
published: true
vizjson:
mailchimp_id:
```

## Lesson variables

```
id:
layout: lesson
title:
subtitle:
course:
course_slug:
continue_link:
tweet_text:
vizjson:
```

The content after the variables will appear in the layout when `{{ content }}` is specified.
