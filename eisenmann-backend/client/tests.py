import pytest

from client.models import DocumentType


@pytest.mark.django_db
def test_document():
    document = DocumentType.objects.create(
        name="RUC",
        description='Description'
    )
    assert document.name == 'RUC'
