let stocks = {               //stok listesi oluşturuldu.
    kofte: 5,
    tavuk: 5,
    patates: 5,
    cola: 5,
    tursu: 5,
    sogan: 5,
    marul: 5,
    domates: 5,
    ekmek: 5,
    paketSos: 5,

};

let stockArray = Object.entries(stocks);




//Yazdırma işlemlerinde kullanılan /n komutları bir alt satıra geçmeyi sağlıyor. Okunurluğu kolaylaştırması için kullandım.

let orderContent = ["tursu","sogan","marul","domates"];  // müşterinin burger içerisinde olacak malzemeleri seçebilmesi için
                                                         // dizi aracılığıyla sunuldu

const input = require('console-read-write');             //console'dan veri almamızı sağlayan yapı. 
                                                         //(npm i --save console-read-write) komutu ile yüklenebilir.


let meal = "";                                    //Et mi Tavuk mu sorgusunu tutacağım değişken.

let degree = "";                                  //Pişme derecesi sorgusunu tutacağım değişken.

let materials = "";                               //Burger içerisine eklenecek malzemelerin sorgusunu tutacağım değişken


let quantity = 0;                                   //Kaç adet burger isteniyor sorgusunu tutacağım değişken

let prepareContent = async function(){              //kod tekrarından kaçmak amacıyla tek fonksiyonda işlemi gerçekleştirip ihtiyac olan yerde
    return Promise.all([                            //cagırdım.
        order(2000, () => {
            console.log(`${materials} eklendi\n`)  
        }),
        order(5000, () => {
            console.log("Patatesler kızartıldı\n")
        }),
        order(2000, () => {
            console.log("İçecek hazırlandı\n")
        })
    ])
}

let meatMeal = async function (meatDegree) {        //Burger seçimi et olursa yapılacak işlemler. Async yapısı sayesinde    
                                                    //çağırıldığı zaman çalışacak ve içerisindeki işlemleri gerçekleştirecek.

    if (degree === "az") {                           //kullanıcıdan aldığımız veri ile derece kontrolü
        order(1000, () => {                          //ana metodumuz olan order'ı çağırdık.
            console.log("Siparişiniz alındı, hazırlanıyor.\n");
        });
        return Promise.all([                         //Buradaki asıl işi yapan Promise.all metodu 
                                                     //hepsinin aynı anda başlamasını sağladı

            order(2000, () => {                       
                console.log("köfte az pişmiş şekilde hazır\n");
            }),


            await prepareContent()                   //seçenek ne olursa olsun hazırlanacak içerikler fonksiyonu
            
        ]);
        
    }

    if (degree === "orta") {                  //et pişme tercihine bağlı olarak yapılan işlemler
        return Promise.all([
            order(3000, () => {
                console.log("köfte orta pişmiş şekilde hazır\n");
            }),
            await prepareContent()              //seçenek ne olursa olsun hazırlanacak içerikler fonksiyonu
        ]);
    }

    if (degree === "cok") {                             //et pişme tercihine bağlı olarak yapılan işlemler
        return Promise.all([
            order(4000, () => {
                console.log("köfte cok pişmiş şekilde hazır\n");
            }),
            await prepareContent()                      //seçenek ne olursa olsun hazırlanacak içerikler fonksiyonu
        ]);
    }

}

let chickenMeal = async function () {              //Burger seçimi tavuk olursa yapılacak işlemler. Async yapısı sayesinde    
                                                   //çağırıldığı zaman çalışacak ve içerisindeki işlemleri gerçekleştirecek.
    order(1000, () => {
        console.log("Siparişiniz alındı, hazırlanıyor.\n");
    });
    return Promise.all([
        order(3000, () => {
            console.log("Tavuk hazır\n");
        }),
        prepareContent()
    ]);

}



function checkMaterialList(stocks,quantity,mealType) {           //kullanıcıdan aldığımız verilerle stok eksilttik.
const newMaterialList = materials.split(',');
    newMaterialList.forEach((material) =>{
        stockArray.forEach((stock)=>{
            if((stock[0] == material)){
                stock[1]-= 1*quantity;
            }
        })
    })
    console.log(`${newMaterialList} stokta mevcut`)
}
  
function checkMealType(stock,mealType) {                             //kullanıcıdan aldığımız verilerle stok eksilttik.   
            stockArray.forEach((stock)=>{
                if((stock[0] == mealType)){
                    stock[1]-= 1*quantity;
                    // console.log(stock[0], mealType)
                }
        })
    }

    function checkOtherType(stock){                       //seçeneklerden bağımsız tüm siparişlerde olacak malzemeleri stoktan eksilttik
    stockArray.forEach((stock)=>{
    if(stock[0]== "patates" || stock[0]=="cola" || stock[0]=="ekmek" || stock[0] =="paketSos"){
        stock[1] -=1*quantity;
    }
})
}


async function order(time, work) {                      //İşlemlerin sırayla ilerlemesini sağlayan ana func.
    return new Promise((resolve, reject) => {           //Then zincirini kullanabilmek için Promise kullandık.
                                                        //Bu sayede işlemlerimizi sıralı bir şekilde tamamlayabildik.
        setTimeout(() => {                              //Bu func iki değer alıyor zaman ve yapılacak iş.
            resolve(work());                            //resolve işin yapılacağı reject ise hata ile karşılaşınca yapılacak
        }, time);                                       //işlemleri tanımladığımız kısımlar.
                                                        //Hata kontrolünü burada yapmadığım için reject kısmı tanımlanmadı.
    });
}

order(1000, () => console.log("Emre Burger'e hoşgeldiniz.\n"))
    .then(() => {
        return order(0, () => {
            console.log("Kaç adet sipariş vermek istersiniz?\n");
        });
    })
    .then( async () => {
        quantity = await input.read();                      //yüklediğim npm ile console üzerinden kullanıcıdan veri aldım.
        if(quantity > 5){                                   //Başta ürünlerimizden 5'er adet olduğu bilindiği için eğer 5'ten 
            return order(3000, () => {}).then(() => {        //fazla bir sipariş isteği gelirse hata verdirdim.
              console.log("Üzgünüz stokta yeterli sayıda ürün bulunmamaktadır.\n"); //5'ten az veya 5 sipariş gelirse işlemler
            })                                                                          //devam edecek.
             .then(()=> {
                 return order(2000, () => {throw "yine bekleriz\n";})
             })
        }
    })
    .then(() => {
        return order(1000, () => {
            console.log(`\nBurgerinizin içerisinde hangi malzemeler olsun istersiniz?\n${orderContent}\n`);
        });                                              //kullanıcıya malzeme listesini sundum ve seçim yapmasını istedim.
    })
    
    .then(async () => {
        materials= await input.read();
    })
    .then(() => {
        return order(1000, () => {
            console.log("Et seçimi yapınız.. kofte / tavuk \n");   
              
        });                                             
    })
    .then(async ()=>{
        meal = await input.read(); 
    })
    .then(() => {
        return order(1000, () => {
            console.log(`\n${materials} stoklarda var mı kontrol ediliyor.\n`);
            
            checkMaterialList(stocks,quantity,meal)
            checkMealType(stocks,meal)
            checkOtherType(stocks)
        })
    })
    
    .then(async () => {
                                         //Kullanıcıdan et seçimi yapmasını istedim.
        if (meal === "kofte") {                                      
            console.log("Pişme durumu nasıl olsun? az / orta / cok ...\n") 
            degree = await input.read();                               //köfte ise pişme derecesini sorguladım.
            await meatMeal(degree);             //dereceyi de aldıktan sonra meatMeal fonksiyonumu derece bilgisi ile çağırdım
        }
        else if(meal === "tavuk"){                                    //tavuk ise chickenMeal fonksiyonumu çağırdım.
            await chickenMeal();
        }
        else{
            throw "Böyle bir ürün bulunmamaktadır\n"
        }
    })
    .then(()=> {
        return order(1000, () => {
            console.log("Soslar ve ürünler tepsiye koyuldu\n");          
        });
    })
    .then(()=> {
        return order(1000, () => {
            console.log("Müşteriye Servis Edildi.. Afiyet Olsun..\n");
        });
    })
    .catch((err) => console.log("Hatalı işlem"))                   //catch ile hata yakalamaya çalıştım.
    .finally(()=> {  
            console.log("Emre Burger'e yine bekleriz...\n");
            console.log(stockArray)      //finally ile hata verse de çalışsa da işlemler sonunda
    });                                                           //şartsız bi şekilde istediğim bir işlemi yaptırdım.
    