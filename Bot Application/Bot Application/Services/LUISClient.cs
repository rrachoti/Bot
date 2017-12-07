using System;
using System.Net.Http.Headers;
using System.Text;
using System.Net.Http;
using System.Web;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Bot_Application
{
    public class LUISClient
    {
        public static async Task<LUISData> ParseUserInput(string strInput)
        {
            var queryString = Uri.EscapeDataString(strInput);
            using (var client = new HttpClient())
            {
                var uri = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/baaa7a6b-6240-4583-9325-3cf9842db7ff?subscription-key=bec28ff482364a0eab948464dad2d032&staging=true&verbose=true&timezoneOffset=0&q=" + queryString;
                HttpResponseMessage response = await client.GetAsync(uri);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var data = JsonConvert.DeserializeObject<LUISData>(json);
                    return data;
                }
            }
            return null;
        }
    }
}