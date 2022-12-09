import "./style.scss";

export default function UserDetailView() {
  return (
    <div>
      Hello UserDetailView!
      <form action="/submitUserDetails" method="post">
        <ul>
          <li>
            <label for="name">Name:</label>
            <input type="text" id="name" name="user_name" />
          </li>
          <li>
            <label for="mail">E-mail:</label>
            <input type="email" id="mail" name="user_email" />
          </li>
          <li>
            <label for="number">Phone Number:</label>
            <input id="number" name="user_phone_number"></input>
          </li>
          <li>
            <label for="uni">University:</label>
            <input id="uni" name="user_university" />
          </li>
          <li>
            <label for="degree">Degree:</label>
            <input id="degree" name="user_degree"></input>
          </li>
          <li class="button">
            <button type="submit">Update</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
