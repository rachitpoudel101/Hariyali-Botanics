from django.db import models


class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class QuizImage(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="quiz_images/")
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.quiz.title}"


class QuizQuestion(models.Model):
    name = models.CharField(max_length=100, unique=True, default=False)
    age_range = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    question_text = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    input_type = models.CharField(
        max_length=20,
        choices=[
            ("text", "Text Input"),
            ("select", "Select Dropdown"),
            ("buttons", "Choice Buttons"),
        ],
        default="buttons",
    )

    def __str__(self):
        return self.question_text


class QuizChoice(models.Model):
    question = models.ForeignKey(
        QuizQuestion, on_delete=models.CASCADE, related_name="choices"
    )
    choice_text = models.CharField(max_length=200)
    body_type = models.CharField(
        max_length=20,
        choices=[
            ("vata", "Vata"),
            ("pitta", "Pitta"),
            ("kapha", "Kapha"),
            ("vata-pitta", "Vata-Pitta"),
            ("vata-kapha", "Vata-Kapha"),
            ("pitta-kapha", "Pitta-Kapha"),
        ],
        blank=True,
        null=True,
        help_text="Select the body type this choice contributes to."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.body_type if self.body_type else self.choice_text



class CustomerQuizLog(models.Model):
    name = models.CharField(max_length=200)
    age_ranges = models.CharField(
        max_length=255, blank=True, null=True
    )  # Comma-separated for multi-select
    email = models.EmailField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    body_type = models.CharField(
        max_length=20, blank=True, null=True
    )  # Vata, Pitta, Kapha, or dual types
    body_type_ratios = models.JSONField(blank=True, null=True)  # Store percentages
    selected_choices = models.ManyToManyField(QuizChoice, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
