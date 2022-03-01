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
    date_str = request.query_params.get('date')
    date = datetime.now()
    if date_str is not None:
        try:
            date = datetime.strptime(date_str, '%m-%Y')
        except ValueError as err:
            print(err)

    year = date.year
    month = date.month

    dt_init = datetime(year=int(year), month=int(month), day=1)
    dt_end = dt_init + relativedelta(months=1)
    return dt_init, dt_end
