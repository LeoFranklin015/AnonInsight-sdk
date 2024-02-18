# Anon Insight

Anon Insight is a versatile tool designed to conduct rating surveys or polls anonymously on any web3/web2 app using our widget. With Anon Insight, you can gather valuable insights while protecting user privacy.

## Features

- **Anonymous Surveys:** Conduct rating surveys or polls anonymously without compromising user privacy.
- **Versatile Integration:** Easily integrate Anon Insight into any web3 or web2 application using our widget.
- **Valuable Insights:** Gather valuable insights from users without requiring them to disclose personal information.

## Installation

To install the Anon Insight package, you can use npm. Open your terminal and run the following command:

```bash
npm install anoninsight
```
or 
```bash
yarn add anoninsight
```

## Usage

To use the Anon Insight package in your project, follow these steps:

1. **Import the Package**: Import the `Rating` component from the `anoninsight` package into your component file.

    ```javascript
    import { Rating } from "anoninsight";
    ```

2. **Use it in Your Component**: Place the `Rating` component within your desired component's render method, providing the necessary props.

    ```javascript
    return (
      <div className="App">
         <Rating
          sindri_circuit_id="Enter the circuit-id" //Which will be generated from our dashboard 
          sindri_api_key="Enter your Sindri API key"
          GOOGLE_CLIENT_ID="Enter the google client id , for oauth"
          groupid="Enter the banada group id "
          apikey="Enter the banada group api key"
        />
      </div>
    );
    ```

3. **Provide Necessary Values**:
   - **Circuit ID**: Obtain the Circuit ID from the [Admin Dashboard](#).
   - **Sindri API Key**: Get your Sindri API key from the [Sindri Website](https://sindri.app).
   - **Google Client ID**: Retrieve your Google Client ID from the [Google Cloud Console](https://cloud.google.com).
   - **Group ID**: Find your Group ID from [Bandada](https://bandada.pse.dev).
   - **API Key**: Obtain your API Key from [Bandada](https://bandada.pse.dev).
