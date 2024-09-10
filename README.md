This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Video #36 có bước debug, có gì xem lại thêm

# Tài liệu Model

- https://react-bootstrap.netlify.app/docs/components/modal/
- bootstrap react modal properties (Search keyword)
- Phân tích:
  - Trong file App.js, sẽ có các link Router, tuỳ vào từng route sẽ render các component khác nhau.
  - Trong component có thể có các route redirect để tiếp tục redirect đến các route khác tuỳ từng điều kiện cụ thể.

```
render() {
    const { isLoggedIn } = this.props;
    let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

    return (
        <Redirect to={linkToRedirect} />
    );
}
```

- Check điều kiện và redirect.
- Hoặc render component.

# Ghi chú redux

- Cấu hình redux trong file index.js
- Trong file index.js, ta đã import: reduxStore là nơi lưu trữ thông tin redux
- persistor là cái của redux giúp lưu trữ 1 biến của redux mà không khác gì một biến của localStorage.
- Trong file appActions.js, tạo một function để fire đến event CHANGE_LANGUAGE, function này sẽ được nhúng vào file view (HomeHeader.js) để dispatch trong hàm mapDispatchToProps để có thể gọi trong props. Trong file appReducer.js, ở phần switch case, thêm trường hợp actionTypes.CHANGE_LANGUAGE để cập nhật lại state trong redux, cụ thể là language.

# Ghi chú video 50

- Thay vì mỗi file component ta tạo một file scss riêng thì ta có thể viết scss trong file dành cho component cha.
- Định nghĩa scss trong file css của component cha, component con sẽ hiểu.

# Cách sử dụng redux

- Tạo file adminActions.js.
- Nội dung mẫu trong file action:

```
import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
```

- Vào file index.js export file vừa mới tạo: `export * from "./adminActions"`
- Nhớ cập nhật actionTypes.js
- Tạo file adminReducer.js:
- Trong file rootReducer.js, import cái adminReducer.js
- Trong hàm mapDispatchToProps, gọi đến hàm trong file adminActions
- Dữ liệu load từ redux, ta cần lưu vào state của component để đưa lên UI.
- Để set dữ liệu, ta viết trong componentDidUpdate().`

# Sử dụng React Preview Image

- https://www.npmjs.com/package/react-image-lightbox : thư viện để preview hình upload lên.

# Ghi chú

- Hàm fetchAllUsersStart có nhiệm vụ gọi API lấy toàn bộ thông tin người dùng mới nhất lưu vào store của redux, một khi dữ liệu lưu trong redux thay đổi sẽ render lại UI, hiển thị danh sách người dùng cập nhật mới nhất.
- Lúc tạo người dùng xong mình sẽ gọi tiếp hàm fetchAllUsersStart bằng cách: dispatch(fetchAllUsersStart())
- Trong file UserRedux.js

```

if (prevProps.listUsers != this.props.listUsers) {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: "",
                position: "",
                role: "",
                avatar: ""
            })
        }
```

- Khi tạo mới người dùng nếu listUsers trong props có thay đổi, nghĩa là người dùng đã được thêm mới thành công, khi đó sẽ refresh lại thông tin các trường tạo mới người dùng.
- FIle to base 64: https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
- Video #90, xử lý hình ảnh
- Để click vào 1 phần tử chuyển sang một url khác thì trong component đó ta import withRouter, sau đó dùng:

```
if (this.props.history) {
    this.props.history.push(`/detail-clinic/${clinic.id}`)
}
```
