import * as React from "react";
import styles from "./GeminiWithSpFx.module.scss";
import { IGeminiWithSpFxProps } from "./IGeminiWithSpFxProps";
import { escape } from "@microsoft/sp-lodash-subset";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAIModal = new GoogleGenerativeAI("API Key"); // Replace the key with the API Key
const geminiModel = genAIModal.getGenerativeModel({ model: "gemini-pro" });

export interface IResponse {
  response: any;
}

export default class GeminiWithSpFx extends React.Component<
  IGeminiWithSpFxProps,
  IResponse
> {
  constructor(props: IGeminiWithSpFxProps) {
    super(props);
    this.state = {
      response: "",
    };
  }
  componentDidMount(): void {
    this.generateContentFromLLM();
  }

  private async generateContentFromLLM() {
    let promptToAnswerQuery = `Generate quotes for the friendship`;
    try {
      const result = await geminiModel.generateContent(promptToAnswerQuery);
      const response = await result.response;
      const text = response.text();

      this.setState({
        response: text.replace("\n\n", ""),
      });
    } catch (error) {
      console.log("Error while getting answer from LLM" + error);
    }
  }

  public render(): React.ReactElement<IGeminiWithSpFxProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return (
      <section
        className={`${styles.geminiWithSpFx} ${
          hasTeamsContext ? styles.teams : ""
        }`}
      >
        {this.state.response}
      </section>
    );
  }
}
