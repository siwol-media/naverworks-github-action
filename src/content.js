import github from "@actions/github";

export default class Content {
  /**
   * @type {Object<string, string>}
   */
  authorMap = {
    ariandel: "장원익",
    "ariandel-dev": "장원익",
    wldygus2023: "지요현",
  };

  /**
   * @type {Object<string, string>}
   */
  branchMap = {
    main: "실섭",
    dev: "개발섭",
  };

  constructor() {
    this.values = github.context;
  }

  /**
   * @typedef {Object} Message
   * @property {Object} content - Contents
   */

  /**
   * @returns {Message}
   */
  getMessage() {
    // create message
    const { payload, ref } = this.values;

    // organization 이름
    const organization = payload?.repository?.owner?.login || "unknown-organization";
    // repository 이름
    const repository = payload?.repository?.name || "unknown-repo";
    // 브랜치 이름 (refs/heads/main => main)
    const branchName = ref?.split("/").pop();

    const branch = branchName ? (this.branchMap[branchName] || branchName) : "unknown-branch";
    // 작성자 이름 (GitHub username)
    const authorName = payload?.head_commit?.author?.username || payload?.head_commit?.author?.name || "unknown-author";

    const author = this.authorMap[authorName] || authorName;
    // 커밋 메시지
    const commitMessage = payload?.head_commit?.message || "No commit message";
    // 커밋 해시
    const commitHash = payload?.head_commit?.id || "unknown-commit-hash";
    // 커밋 URL
    const commitUrl = payload?.head_commit?.url || `https://github.com/${organization}/${repository}/commit/${commitHash}`;

    return {
      content: {
        type: "flex",
          altText: `[${repository}]\n ${commitMessage}`,
          contents: {
            type: "carousel",
            contents: [
              {
                type: "bubble",
                size: "mega",
                header: {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: repository,
                      size: "lg",
                      color: "#00c73c",
                      weight: "bold",
                    },
                  ],
                  backgroundColor: "#ffffff",
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "text",
                          text: commitMessage,
                          wrap: true,
                          size: "md",
                        },
                      ],
                      margin: "xl",
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "text",
                              text: "브랜치",
                              size: "sm",
                              color: "#858f89",
                              flex: 3,
                              margin: "md",
                            },
                            {
                              type: "text",
                              text: branch,
                              size: "sm",
                              margin: "md",
                              flex: 5,
                            },
                          ],
                        },
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "text",
                              text: "작성자",
                              size: "sm",
                              color: "#858f89",
                              flex: 3,
                              margin: "md",
                            },
                            {
                              type: "text",
                              text: author,
                              size: "sm",
                              margin: "md",
                              flex: 5,
                            },
                          ],
                          margin: "sm",
                        },
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "text",
                              text: "커밋",
                              size: "sm",
                              color: "#858f89",
                              flex: 3,
                              margin: "md",
                            },
                            {
                              type: "text",
                              text: commitUrl.split("/").pop() || "",
                              size: "sm",
                              margin: "md",
                              flex: 5,
                              decoration: "underline",
                              action: {
                                type: "uri",
                                label: "",
                                uri: commitUrl,
                              },
                            },
                          ],
                          margin: "sm",
                        },
                      ],
                      margin: "xxl",
                      width: "260px",
                      alignItems: "center",
                      paddingAll: "6px",
                    },
                  ],
                },
              },
            ],
          },
        },
      };
    }
}
