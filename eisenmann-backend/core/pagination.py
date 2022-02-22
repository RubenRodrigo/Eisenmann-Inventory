from functools import wraps
from django.db.models import QuerySet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 15

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'countItemsOnPage': self.get_page_size(self.request),
            'total_pages': self.page.paginator.num_pages,
            'current': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })


def paginate(func):
    """
    Decorator to paginate custom views. The view(function) must return an Queryset for this pagination to work
    """
    @wraps(func)
    def inner(self, *args, **kwargs):
        queryset = func(self, *args, **kwargs)
        assert isinstance(queryset, (list, QuerySet)
                          ), "apply_pagination expects a List or a QuerySet"

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    return inner
