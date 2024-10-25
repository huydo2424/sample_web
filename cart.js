let currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : []
let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : []
currentUserID = currentUser[currentUser.length - 1].id

function checkForCart(productID) {
    if (currentUser.length < 1) {
        alert("Bạn cần đăng nhập để thêm giỏ hàng!")
        return 0
    }
    if (currentUserID > 0) {
        addToCart(currentUserID, productID)
    } else {
        alert("Thêm giỏ hàng lỗi, bạn cần đăng nhập lại!")
    }
}

function addToCart(userID, productID) {
    let count = 0
    if (cart.length < 1) {
        cart.push({
            userID: userID,
            id: productID,
            quantity: 1
        })
    } else {
        for (let item of cart) {
            if (productID == item.id && userID == item.userID) {
                count = 1
                break
            }
        }
        if (count == 1) {
            for (let item of cart) {
                if (productID == item.id && userID == item.userID) {
                    item.quantity += 1
                    alert("Sản phẩm đã có trước đó, đã tăng số lượng!")
                    break
                }
            }
        } else {
            cart.push({
                userID: userID,
                id: productID,
                quantity: 1
            })
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    update_noti_cart()
}

function update_noti_cart() {
    let quantity = 0
    if (cart.length > 0 && currentUser.length > 0) { //Kiểm tra giỏ hàng, hiện những mặt hàng của người đang đăng nhập ra thông báo.
        for (let item of cart) {
            if (item.userID == currentUser[currentUser.length - 1].id) {
                quantity += 1
            }
        }
        document.getElementById("cart_count").innerText = quantity
    }
}
update_noti_cart()

function cart_show() {
    for (let product of products) {
        for (let item of cart) {
            if (item.id == product.id && item.userID == currentUser[currentUser.length - 1].id) {
                let cart_item = `
                    <tr>
                        <td>${item.userID}</td>
                        <td>${item.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td><button onclick="update_cart(${item.userID},${item.id},-1)">-</button> ${item.quantity} <button onclick="update_cart(${item.userID},${item.id},1)">+</button></td>
                        <td><button onclick="delete_cart(${item.userID},${item.id})">Xoá</button></td>
                    </tr>
                `
                document.getElementById("tablebody").innerHTML += cart_item
            }
        }
    }
}
cart_show()

function update_cart(userID, productID, value) {
    for (i in cart) {
        if (cart[i].userID == userID && cart[i].id == productID) {
            if (cart[i].quantity == 1 && value == -1) {
                cart.splice(i, 1)
                break
            } else {
                cart[i].quantity += value
            }
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    update_noti_cart()
    location.reload()
}

function delete_cart(userID, productID) {
    let existingItem = cart.find((item) => item.userID == userID && item.id == productID)
    if (existingItem) {
        cart_delete = cart.filter((item) => item.userID == userID && item.id == productID)
        cart = cart.filter((new_item) => !cart_delete.includes(new_item))
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    update_noti_cart()
    location.reload()
}