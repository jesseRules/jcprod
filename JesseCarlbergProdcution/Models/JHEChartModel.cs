using System;
namespace JesseCarlbergProdcution.Models
{
    public class JHEChartModel
    {
        public List<ChartDataProvider> dataProvider { get; set; }
    }

    public class ChartDataProvider
    {
        public DateTime date_stamp { get; set; }
        public int cnt_confirmed { get; set; }
        public int cnt_death { get; set; }
        public int cnt_recovered { get; set; }
    }
}