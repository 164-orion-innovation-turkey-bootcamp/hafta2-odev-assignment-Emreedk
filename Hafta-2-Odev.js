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


//Yazdırma işlemlerinde kullanılan /n komutları bir alt satıra geçmeyi sağlıyor. Okunurluğu kolaylaştırması için kullandım.

let orderContent = ["tursu","sogan","marul","domates"];  // müşterinin burger içerisinde olacak malzemeleri seçebilmesi için
                                                         // dizi aracılığıyla sunuldu

const input = require('console-read-write');             //console'dan veri almamızı sağlayan yapı. 
                                                         //(npm i --save console-read-write) komutu ile yüklenebilir.


let meal = "";                                    //Et mi Tavuk mu sorgusunu tutacağım değişken.

let degree = "";                                  //Pişme derecesi sorgusunu tutacağım değişken.

let materials = "";                               //Burger içerisine eklenecek malzemelerin sorgusunu tutacağım değişken

let quantity = 0;                                   //Kaç adet burger isteniyor sorgusunu tutacağım değişken

let meatMeal = async function (meatDegree) {        //Burger seçimi et olursa yapılacak işlemler. Async yapısı sayesinde    
                                                    //çağırıldığı zaman çalışacak ve içerisindeki işlemleri gerçekleştirecek.

    if (degree === "az") {                           //kullanıcıdan aldığımız veri ile derece kontrolü
        order(1000, () => {                          //ana metodumuz olan order ile async yapıda çalıştırdık.
            console.log("Siparişiniz alındı, hazırlanıyor.\n");
        });
        return Promise.all([                         //Buradaki asıl işi yapan Promise.all metodu 
                                                     //hepsinin aynı anda başlamasını sağladı

            order(2000, () => {                       
                console.log("köfte az pişmiş şekilde hazır\n");
            }),
            order(2000, () => {
                console.log(`${materials} eklendi\n`)  //kullanıcıdan aldığımız burgere eklenecekler bilgisini ekledik.
            }),
            order(5000, () => {
                console.log("Patatesler kızartıldı\n")
            }),
            order(2000, () => {
                console.log("İçecek hazırlandı\n")
            })
        ]);
    }


    if (degree === "orta") {                  //et pişme tercihine bağlı olarak aynı işlemler tekrarlandı.
        return Promise.all([
            order(3000, () => {
                console.log("köfte orta pişmiş şekilde hazır\n");
            }),
            order(2000, () => {
                console.log(`${materials} eklendi\n`)
            }),
            order(5000, () => {
                console.log("Patatesler kızartıldı\n")
            }),
            order(2000, () => {
                console.log("İçecek hazırlandı\n")
            })
        ]);
    }

    if (degree === "cok") {                             //et pişme tercihine bağlı olarak aynı işlemler tekrarlandı.
        return Promise.all([
            order(4000, () => {
                console.log("köfte cok pişmiş şekilde hazır\n");
            }),
            order(2000, () => {
                console.log(`${materials} eklendi\n`)
            }),
            order(5000, () => {
                console.log("Patatesler kızartıldı\n")
            }),
            order(2000, () => {
                console.log("İçecek hazırlandı\n")
            })
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
        order(2000, () => {
            console.log(`${materials} eklendi\n`)
        }),
        order(5000, () => {
            console.log("Patatesler kızartıldı\n")
        }),
        order(2000, () => {
            console.log("İçecek hazırlandı\n")
        })
    ]);

}


function checkMaterialList(stocks) {                                //Bu func ile stoktaki ürünlerin kontrolü yapılıyor.
    return Object.values(stocks).every((element) => element > 0);   //Stoktaki ürünler 0'dan fazla ise true döner.
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
        materials = await input.read();
    })
    .then(() => {
        return order(1000, () => {
            console.log(`\n${materials} stoklarda var mı kontrol ediliyor.\n`);
            
            if(checkMaterialList(stocks)){                     //checkMaterialList metodu ile stok kontrolü yaptım.
                console.log("\nÜrünler mevcut...\n")
            }
            else{
                throw "Yeterli sayıda stok yok üzgünüz\n"       //yeterli ürün yoksa hata verdirdim.
            }
        })
    })
    .then(() => {
        return order(1000, () => {
            console.log("Et seçimi yapınız.. köfte / tavuk \n");    
        });                                             
    })
    .then(async () => {
        meal = await input.read();                                   //Kullanıcıdan et seçimi yapmasını istedim.
        if (meal === "köfte") {                                      
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
            console.log("Emre Burger'e yine bekleriz...\n");      //finally ile hata verse de çalışsa da işlemler sonunda
    });                                                           //şartsız bi şekilde istediğim bir işlemi yaptırdım.






