select dt
     , visitors
from googleanl.visitors
where dt >= dateadd(day, datediff(day, 0, @StartDate), 0)
  and dt < dateadd(day, datediff(day, 0, @EndDate) + 1, 0)