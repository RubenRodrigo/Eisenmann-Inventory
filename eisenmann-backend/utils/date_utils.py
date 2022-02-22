from dateutil.relativedelta import relativedelta
from datetime import date, datetime


def add_months(sourcedate, months):
    """ Add months to a given date """
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = 1
    return date(year, month, day)


def get_date_init_end(request):
    year = request.query_params.get('year')
    month = request.query_params.get('month')
    if year is None or month is None:
        today = datetime.now()
        year = today.year
        month = today.month

    dt_init = datetime(year=int(year), month=int(month), day=1)
    dt_end = dt_init + relativedelta(months=1)
    return dt_init, dt_end
