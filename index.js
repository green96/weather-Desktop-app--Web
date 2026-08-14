//WEATHER APP

//querySelector will return the first elements in the class 
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");



//tạo các biến chứa hình bằng id
const cloud2 = document.getElementById("img2");
const cloud1 = document.getElementById("img1");
const question_mark = document.getElementById("question_mark");
const umbrella = document.getElementById("umbrella")
const raincloud1 = document.getElementById("raincloud1");
const raincloud2 = document.getElementById("raincloud2");
const exclamation_point = document.getElementById("exclamation_point");
const cloud_snow1 = document.getElementById("cloud_snow1");
const cloud_snow2 =document.getElementById("cloud_snow2");
const compass = document.getElementById("compass");
const smiley = document.getElementById("smiley");
const camera = document.getElementById("camera");


//biến GetWeatherButton là elements nút submit
const GetWeatherButton = document.getElementById("GetWeatherButton");



/*
const: Đây là từ khóa trong JavaScript dùng để khai báo một biến hằng số, tức là sau khi gán giá trị, không thể thay đổi được.
apikey: Đây là tên của biến. Nó thường được dùng để lưu API key – một chuỗi mã định danh dùng để xác thực người dùng khi gọi các dịch vụ từ một API (Application Programming Interface).
process.env.OPENWEATHER_API_KEY: Đây là giá trị của API key – một chuỗi ký tự duy nhất do một dịch vụ web cung cấp (ví dụ như OpenWeatherMap, Firebase, v.v.). Khi bạn muốn truy cập dữ liệu từ API đó, bạn cần cung cấp key này để được cấp quyền.

*/
const apikey = process.env.OPENWEATHER_API_KEY;


//weatherForm: là một biến đại diện cho thẻ <form> trong HTML (có thể được lấy bằng document.getElementById() hoặc querySelector()).
//.addEventListener("submit", ...): thêm sự kiện cho form khi người dùng nhấn nút "submit".
//event: là đối tượng đại diện cho sự kiện vừa xảy ra.


//async event => { ... }: Đây là một arrow function (hàm mũi tên) có từ khóa async, tức là nó có thể dùng await bên trong.
//Vì nó là hàm dùng để xử lý sự kiện → nó là một function, nhưng được viết ngắn gọn bằng cú pháp arrow function.

//Cú pháp: variable_name.addEventListener("event_name", arrow_function_name => {....code in function here....})
weatherForm.addEventListener("submit", async event => {

    //this prevent refreshing the page when click the submit button
    event.preventDefault();//This prevent default behavior of the submit type button 


    //.value là thuộc tính của các thẻ input, textarea và select trong HTML.
    //Nó dùng để lấy (hoặc đặt) giá trị mà người dùng nhập vào.

    //.value: Lấy giá trị người dùng đã nhập vào ô input (tức là tên thành phố).
    // const city = ...: Gán giá trị đó vào biến city.
    const city =  cityInput.value;//take the value of the html elements from the input class

    //if the is city
    if(city){
        //we will try some code
        try{
            // we only allow to used await in a async function
            const weatherData = await getWeatherData(city);//await getWeatherData(); going to wait for this function to return the weather data

            //after the get the weatherData
            //we will called the displayWeatherInfo function with the weatherData variable in it
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);//in loi ra console
            displayError(error);// called the displayError function with the parameter error
        }
    }
    else{
        displayError("Please enter a city");
    }
} );

// Hàm lấy dữ liệu thời tiết:
//async: từ khóa khai báo đây là hàm bất đồng bộ, cho phép sử dụng await bên trong.
//city: là tên thành phố do người dùng nhập vào.
async function getWeatherData(city){

    //link dưới là API call (Built-in API request by city name) của https://openweathermap.org/current
    //thay {city name} thành ${city} (biến city của mình)
    //thay {API key}` thành ${apikey} (biến apikey của mình đã chứa dữ liệu key api)

    //Tạo đường dẫn API:
    //Sử dụng template string (``) để chèn biến city và apikey vào đường dẫn API.
    //city: tên thành phố người dùng muốn tra cứ
    //apikey: khóa truy cập API bạn đã đăng ký từ trang openweathermap.org.
    //Ví dụ nếu:city = "Hanoi", apikey = "abc123"=> apiUrl sẽ là:https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=abc123
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;//ở đây phải dùng dấu ``

    //Sử dụng fetch() để gửi yêu cầu HTTP GET đến API.(fetch() similar to XMLHttpRequest BUT It offers a more flexible and powerful alternative to the older XMLHttpRequest (XHR) method.)
    //await: chờ cho đến khi dữ liệu phản hồi từ API trả về.
    const response = await fetch(apiUrl);

    console.log(response)//In kết quả phản hồi (để kiểm tra):


    if(!response.ok){//Nếu không thành công (ví dụ mã 404, 500...), thì ném lỗi (throw) để báo rằng không thể lấy dữ liệu.
        throw new Error("Could not fetch weather data");
    }


    /*
        Trong JavaScript, Promise là một đối tượng đại diện cho kết quả của một thao tác bất đồng bộ (asynchronous), có thể hoàn thành thành công hoặc thất bại trong tương lai.

        Promise giống như lời hứa:

            "Tôi hứa sẽ trả kết quả cho bạn sau – hoặc là thành công, hoặc là thất bại."


        Trạng thái của Promise:

        Một Promise có 3 trạng thái chính:
        Trạng thái	            Ý nghĩa
        pending	        Đang chờ xử lý (chưa hoàn thành)
        fulfilled	    Đã hoàn thành thành công (resolve)
        rejected	    Đã thất bại (reject)
    */

    //response.ok là true nếu mã trạng thái HTTP là từ 200–299 (thành công).
    //response.json() là một Promise, chứa dữ liệu thời tiết (nhiệt độ, độ ẩm, mô tả, v.v.).
    //await đảm bảo bạn nhận được dữ liệu đã chuyển sang định dạng đối tượng JavaScript.
    return await response.json();
}


// Hàm hiển thị thông tin thời tiết:
//data: là dữ liệu JSON trả về từ API.
//Bạn sẽ lấy các thông tin như data.main.temp, data.weather[0].description, v.v. và hiển thị lên giao diện người dùng.
function displayWeatherInfo(data){//Hàm nhận vào data, là đối tượng JSON chứa dữ liệu thời tiết do API trả về.
    console.log(data);//console.log(data) dùng để xem toàn bộ cấu trúc đối tượng trong console.




    /*
    Destructuring là gì?
    Destructuring trong JavaScript là cú pháp cho phép bạn "giải nén" giá trị từ mảng hoặc object thành các biến riêng biệt.
📦 Có 2 loại chính:
    Array Destructuring (Giải nén từ mảng)
    Object Destructuring (Giải nén từ đối tượng)
    Array Destructuring	Giải nén giá trị theo vị trí	[a, b] = [1, 2]
    Object Destructuring	Giải nén theo tên thuộc tính	{ name } = user
    Nested Destructuring	Giải nén trong object lồng nhau	{ main: { temp } } = data
    */









    //This is object destructuring
    //we access the name property of the weather data that we fetch
    // create a variable city(Miami in this case)
    // we also access main(main is a object that have property )
    // weather here is an array of objects
    //phần destructuring:
    const{name: city, // data.name → city name (vd: "Hanoi")
        main: {temp,humidity}, // data.main.temp và data.main.humidity
        weather: [{description, id}]} // data.weather là mảng chứa 1 object → lấy description & id từ object đầu tiên
        = data //This data here is one gigantic object that has nested objects and nested arrays 
        //After destructuring we will have these variables(city,temp,humidity,description,id)
    
        card.textContent = "";//reset all text before this(Xóa nội dung cũ trong thẻ card)
        card.style.display = "flex"; // hiển thị lại card dạng flex


        /*
        const cityDisplay = document.createElement("h1"); tạo 1 elements mới(h1)==> gán vào biến cityDisplay
        
        
        Dòng lệnh	            Tạo ra thẻ HTML	                Ý nghĩa
document.createElement("h1")	    <h1>	           Thường dùng cho tiêu đề lớn – tên thành phố
document.createElement("p")	        <p>	               Dùng để hiển thị các đoạn văn nhỏ: nhiệt độ, độ ẩm, mô tả, emoji
🧠 Vì sao phải tạo bằng JS?
Vì dữ liệu thời tiết được lấy động từ API, nên bạn phải:

    Tạo thẻ trong JS

    Gán dữ liệu động vào (như temp, humidity, v.v.)

    Rồi mới thêm vào giao diện
        
        */

        //Tạo ra các phần tử HTML mới (như <h1>, <p>) trong JavaScript, thay vì viết sẵn trong file HTML.
        const cityDisplay = document.createElement("h1");// Tên thành phố
        const temDisplay= document.createElement("p");// Nhiệt độ
        const humidityDisplay = document.createElement("p");// Độ ẩm
        const descDisplay = document.createElement("p");// Mô tả thời tiết
        const weatherEmoji = document.createElement("p"); // Biểu tượng thời tiết

        //Gán dữ liệu vào thẻ
        //city: là tên thành phố (ví dụ: "Hanoi") – bạn lấy từ API ở phần destructuring.
        //.textContent: dùng để chèn nội dung chữ vào thẻ <h1>.
        cityDisplay.textContent = city;

        //`...`( Đây là template string trong JavaScript — giống như "..." hoặc '...', nhưng có thể nhúng biến hoặc biểu thức bên trong bằng ${...}.)
        //${ ... }Đây là cú pháp để chèn giá trị động vào trong chuỗi.Bên trong ${...} bạn có thể viết bất kỳ biểu thức JavaScript nào, chứ không chỉ biến đơn thuần.
        //Công thức chuyển sang Celsius là: °C = Kelvin - 273.15(temp lấy trên API mặc định là Kelvin)
        //.toFixed(1) sẽ trả về chuỗi với 1 số sau dấu phẩy.(VD: (300.15 - 273.15).toFixed(1) → "27.0")
        temDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        //tương tự

        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;

        //id	Là mã thời tiết (weather condition ID) từ API, ví dụ: 800, 500, 200, v.v.
        //getWeatherEmoji(id)	Gọi hàm getWeatherEmoji với id để trả về emoji phù hợp
        //weatherEmoji.textContent = ...	Gán emoji này vào phần tử HTML (thẻ <p>) để hiển thị
        weatherEmoji.textContent = getWeatherEmoji(id);

        //chạy này niếu muốn dùng độ F
        //temDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;



        // Gán class CSS vào thẻ (để dễ trang trí sau)
        //Thêm một class CSS tên "cityDisplay" vào thẻ cityDisplay
        cityDisplay.classList.add("cityDisplay");// này dùng để thêm thuộc tính css đã tạo sẵn vào 1 phần tử mới tạo(biến mới) trong javascript 
        //tương tự

        temDisplay.classList.add("temDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");


        //Thêm thẻ này vào card (thẻ cha)
        //card là một phần tử HTML (ví dụ: <div id="card"></div>) đã có sẵn trong HTML.
        //.appendChild(...): Thêm cityDisplay vào bên trong card.
        card.appendChild(cityDisplay);

        //tương tự
        card.appendChild(temDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);

    }


function getWeatherEmoji(weatherId){//weatherId: là mã thời tiết từ API (ví dụ 800, 501, 210...).
    //lên link này để xem điều kiện cho mỗi loại thời tiết
    //https://openweathermap.org/weather-conditions

    
    switch(true){//➡️ Vậy switch(true) biến switch thành một dạng nhiều điều kiện if-else, mỗi case là một điều kiện logic.
        case (weatherId >= 200 && weatherId < 300):
            exclamation_point.style.display = "block";
            return "⛈️";// Dông bão
        case (weatherId >= 300 && weatherId < 400):
            umbrella.style.display = "block";
            return "🌦️";// Mưa phùn
        case (weatherId >= 500 && weatherId < 600):
            raincloud1.style.display = "block";
            raincloud2.style.display = "block";
            return "🌧️";// Mưa
        case (weatherId >= 600 && weatherId < 700):
            cloud_snow1.style.display = "block";
            cloud_snow2.style.display = "block";
            return "❄️";// Tuyết
        case (weatherId >= 700 && weatherId < 800):
            compass.style.display = "block";
            return "🌫️";// Sương mù, bụi
        case (weatherId === 800):
            smiley.style.display = "block";
            camera.style.display = "block";
            return "☀️"; // trời trong
        case (weatherId >= 801 && weatherId < 810):
            cloud2.style.display = "block";
            cloud1.style.display = "block";
            return "☁️";// Có mây
        default:
            question_mark.style.display = "block";
            return "❓";// Không xác định



            /*
            ✅ Các case cụ thể
            weatherId	Điều kiện thời tiết	Emoji	Mô tả ngắn
            200–299	    Thunderstorm (giông bão)	⛈️	⚡ Mưa giông
            300–399	    Drizzle (mưa phùn)	        🌧️	☔ Mưa nhẹ
            500–599	    Rain (mưa)	                🌧️	Mưa vừa/lớn
            600–699	    Snow (tuyết)	            ❄️	❄️ Tuyết
            700–799	    Atmosphere (sương, bụi...)	🌫️	🌫️ Sương mù
            800	        Clear (trời trong)	        ☀️	☀️ Quang đãng
            801–809	    Clouds (có mây)	            ☁️	☁️ Mây nhiều
            Khác	    Không xác định	            ❓	❓ Không rõ
            */ 
    }
}

function displayError(message){
    //document.createElement("p"); Tạo ra một phần tử <p> mới.Biến errorDisplay đại diện cho phần tử này.
    const errorDisplay = document.createElement("p");

    //Gán nội dung văn bản cho thẻ <p>.Biến message là một chuỗi chứa thông báo lỗi (ví dụ: "Vui lòng nhập tên thành phố").
    errorDisplay.textContent = message
    //Thêm class "errorDisplay" vào thẻ <p> để có thể định dạng bằng CSS.
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";//This reset the text content of a card elements
    
    card.style.display = "flex";//show tha card as flex level elements

    card.appendChild(errorDisplay);//Thêm phần tử <p> (chứa lỗi) vào bên trong phần tử card.
}




// reset tất cả imgage khi click tìm thời tiết mới(giúp loại bỏ mấy hình bị dư)
GetWeatherButton.addEventListener('click', function(){
    cloud1.style.display = "none";
    cloud2.style.display = "none";
    question_mark.style.display = "none";
    umbrella.style.display = "none";
    raincloud1.style.display = "none";
    raincloud2.style.display = "none";
    exclamation_point.style.display = "none";
    cloud_snow1.style.display = "none";
    cloud_snow2.style.display = "none";
    compass.style.display = "none";
    smiley.style.display = "none";
    camera.style.display = "none";
})




