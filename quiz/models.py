from django.db import models
class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    text = models.CharField(max_length=300)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.text


class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    text = models.CharField(max_length=200)
    value = models.CharField(max_length=100)  # e.g. 'oily', 'dry', 'acne', etc.

    def __str__(self):
        return self.text