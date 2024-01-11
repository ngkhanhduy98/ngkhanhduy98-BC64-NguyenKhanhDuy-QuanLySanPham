//link api: https://6597f7bd668d248edf23d034.mockapi.io/product

var delay = 20000;
var idEdited = null;
//Loading
function turnOnLoading(){
    document.getElementById('spinner').style.display = 'block';
}
function turnOffLoading(){
    delay;  
    document.getElementById('spinner').style.display = 'none';
}

//ResetForm
function resetForrm(){
    var listInput = document.querySelectorAll('input');
    for(var i = 0;i<listInput.length;i++){
        listInput[i].value='';
    }
    console.log('😀 - ResetForrm - List Input',listInput)
}
// RENDER Sản phẩm lên giao diện
function renderProducts(productArray) {
    var contentHTML = "";
    for (var i =productArray.length -1; i >= 0 ; i--) {
      var product = productArray[i];
      var trString = ` <tr>
                          <td>${product.id}</td>
                          <td>${product.name}</td>
                          <td>${product.price}</td>
                          <td>${product.img}</td>
                          <td>${product.desc}</td>
                          <td>
  
                          <button
                          onclick=deleteProduct(${product.id})
  
                          class="btn btn-danger">Delete</button>
                          <button onclick=getProductData(${product.id}) class="btn btn-primary">Edit</button>
                          </td>
                      </tr>`;
  
      contentHTML = contentHTML + trString;
    }
    document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

//Lấy ds sản phẩm từ server + render lên giao diện
function fetchProductList(){
    turnOnLoading();
    axios({
        url:'https://6597f7bd668d248edf23d034.mockapi.io/product',
        method:'GET',
    }).then(function(res)  {
        console.log(res);
        renderProducts(res.data);
        turnOffLoading();
    })
    .catch(function(err)  {
        console.log(err);
        turnOffLoading();
    });
}
fetchProductList();

//Xóa sản phẩm

function deleteProduct(id){
    turnOnLoading();
    axios({
        url:`https://6597f7bd668d248edf23d034.mockapi.io/product/${id}`,
        method: 'DELETE',
    }).then(function(res)  {
        console.log('Xóa được rồi é',res);
        fetchProductList();
        turnOffLoading();
    })
    .catch(function(err)  {
        console.log('Gà vcl khum xóa đc. Lỗi nè coi đi',err);
        turnOffLoading();
    });
}


//Thêm sản phẩm
function createProduct(){
    var tenSP = document.getElementById('TenSP').value;
    var giaSP = document.getElementById('GiaSP').value;
    var hinhSP = document.getElementById('HinhSP').value;
    var moTa = document.getElementById('MoTaSP').value;
    var sp = {
        name:tenSP,
        price:giaSP,
        img:hinhSP,
        decs:moTa,
    }
    axios({
        url:`https://6597f7bd668d248edf23d034.mockapi.io/product`,
        method: 'POST',
        data:sp,
    })
    .then(function(res)  {
        fetchProductList();
        $('#myModal').modal('hide');
        console.log('Chúc mừng bẹn đã thim đc sản fẩm',res);
    })
    .catch(function(err)  {
        console.log('Chúc bạn may mắn lần sau. Mã lỗi là:',err);
    });
}

//Sửa thông tin sản phẩm
    //Lấy thông tin theo ID
    function getProductData(id){
        idEdited = id;
        axios({
            url:`https://6597f7bd668d248edf23d034.mockapi.io/product/${id}`,
            method: 'GET',
        })
        .then(function(res){
            $('#myModal').modal('show');
            var sp=res.data;
            document.getElementById('TenSP').value = sp.name;
            document.getElementById('GiaSP').value = sp.price;
            document.getElementById('HinhSP').value = sp.img;
            document.getElementById('MoTaSP').value = sp.decs;
            console.log('Khúc này là lấy được data để đưa lên modal rồi nè',res);
        })
        .catch(function(err)  {
            console.log('Níu mà dòng này xuất hiện thì lỗi cmnr é',err);
        });
    }
    //Giờ thì sửa thông tin hoy
    function updateProductData(){
        var tenSP = document.getElementById('TenSP').value;
        var giaSP = document.getElementById('GiaSP').value;
        var hinhSP = document.getElementById('HinhSP').value;
        var moTa = document.getElementById('MoTaSP').value;
        var sp = {
            name:tenSP,
            price:giaSP,
            img:hinhSP,
            decs:moTa,
        }
        axios({
            url:`https://6597f7bd668d248edf23d034.mockapi.io/product/${idEdited}`,
            method: 'PUT',
            data:sp,
        })
        .then(function(res)  {
            console.log('Chạy được rồi é',res);
            fetchProductList();
            $('#myModal').modal('hide');
        })
        .catch(function(err)  {
            console.log('Thấy cái này là hỉu rồi hén',err);
        });
    }