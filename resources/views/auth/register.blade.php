@if ($errors->any())
    <div style="background-color: #f87171; color: #fff; padding: 2px; margin: 0 auto; text-align: center; border-radius: 8px;">
        <p style="font-size: 18px;">{{ $errors->first() }}</p>
    </div>
@endif
<!DOCTYPE html>
<html>

<head>
    <title>Sign up</title>
    <style>
        :root {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
                "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
                "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* CSS HEX */
            --thistle: #cdb4dbff;
            --fairy-tale: #ffc8ddff;
            --carnation-pink: #ffafccff;
            --uranian-blue: #bde0feff;
            --light-sky-blue: #a2d2ffff;
        }

        body{
            margin: 0;
            padding: 0;
        }
        .bg-primary {
            background-color: var(--fairy-tale);
        }

        .bg-secondary {
            background-color: var(--carnation-pink);
        }

        .bg-tertiary {
            background-color: var(--uranian-blue);
        }

        .bg-light {
            background-color: var(--light-sky-blue);
        }

        .bg-accent {
            background-color: var(--thistle);
        }

        /* Use normal CSS classes to style the page */
        .container {
            height: calc(100vh - 10px);
            width: 100%;
            display: grid;
            place-content: center;
            background-color: #f7fafc;
        }

        .form {
            background-color: #ffffff;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 32px;
            max-width: 480px;
        }

        .input {
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 8px 16px;
            width: 95%;
            margin-bottom: 16px;
            outline: none;
        }

        .input:focus {
            border-color: #cbd5e0;
        }
        button{
            border: none;
        }

        .button {
            color: #ffffff;
            border-radius: 8px;
            padding: 8px 16px;
            width: 100%;
            margin-bottom: 16px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .button:hover {
            background-color: #2d3748;
        }

        .google-button {
            background-color: #dc2626;
            color: #ffffff;
            border-radius: 8px;
            padding: 8px 16px;
            width: 100%;
            margin-bottom: 16px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .google-button:hover {
            background-color: #c53030;
        }

        .google-icon {
            height: 24px;
            width: 24px;
            margin-right: 8px;
        }

        .guest-button {
            color: #ffffff;
            border-radius: 8px;
            padding: 8px 16px;
            width: 100%;
            margin-bottom: 16px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .guest-button:hover {
            background-color: #a0aec0;
        }

        .login-link {
            text-align: center;
            color: #4a5568;
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Form -->
        <form class="form" method="POST" action="{{ route('signup') }}">
            @csrf
            <h1 class="text-3xl font-bold mb-8">Sign up</h1>

            <!-- Name input -->
            <input class="input" type="text" placeholder="Name" value="{{ old('name') }}" name="name" required
                autofocus>

            <!-- Email input -->
            <input class="input" type="email" placeholder="Email" value="{{ old('email') }}" name="email"
                required>

            <!-- Password input -->
            <input class="input" type="password" placeholder="Password" name="password" required>

            <!-- Confirm password input -->
            <input class="input" type="password" placeholder="Confirm password" name="password_confirmation" required>

            <!-- Sign up button -->
            <button class="button bg-secondary" type="submit">Sign up</button>

            <!-- Or sign up with Google button -->
            {{-- <a href="{{ route('google.signup') }}" class="google-button">
                <img class="google-icon" src="google-icon.png" alt="Google Icon">
                Sign up with Google
            </a> --}}

            <!-- Use without login button -->
            <button class="guest-button  bg-light" type="button">Use without login</button>

            <!-- Or login option -->
            <p class="login-link" onclick="window.location.href=''">Or login</p>
        </form>
    </div>
</body>

</html>
