import pytest
from django.contrib.auth import get_user_model

# Create your tests here.


@pytest.mark.django_db
def test_create_superuser():
    db = get_user_model()
    new_user = db.objects.create_superuser(
        email='test@gmail.com',
        password='test',
        username='test_superuser',
    )
    assert new_user.is_superuser == True
    assert new_user.is_staff == True
    assert new_user.is_active == True

    with pytest.raises(ValueError):
        db.objects.create_superuser(
            email='test@gmail.com',
            password='test',
            username='test_superuser',
            is_staff=False,
        )

    with pytest.raises(ValueError):
        db.objects.create_superuser(
            email='test@gmail.com',
            password='test',
            username='test_superuser',
            is_superuser=False,
        )


@pytest.mark.django_db
def test_create_user():
    db = get_user_model()
    new_user = db.objects.create_superuser(
        email='test@gmail.com',
        password='test',
        username='test_superuser',
    )

    assert new_user.__str__() == 'test@gmail.com'

    with pytest.raises(ValueError):
        db.objects.create_superuser(
            email='',
            password='test',
            username='test_superuser',
        )
