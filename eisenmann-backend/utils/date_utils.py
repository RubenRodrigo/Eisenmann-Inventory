from datetime import date


def add_months(sourcedate, months):
    """ Add months to a given date """
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = 1
    return date(year, month, day)
