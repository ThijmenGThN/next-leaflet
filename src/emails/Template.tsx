import { Html, Head, Body, Link, Text } from "@react-email/components"

export default function EmailTemplate() {
  
  const colors = {
    primary: "#12D37C",       // Main brand/accent color
    background: "#FAFAFA",    // Page background
    card: "#FFFFFF",          // Card/content background
    text: "#263238",          // Primary text
    secondaryText: "#546E7A", // Secondary/supporting text
    border: "#E0E0E0"         // Border color
  }

  return (
    <Html>
      <Head>
        <style>
          {`
            @media only screen and (max-width: 600px) {
              .container { width: 100% !important; }
              .mobile-padding { padding: 30px 20px !important; }
              .header-padding { padding: 20px !important; }
              .stack-on-mobile { display: block !important; width: 100% !important; }
              .center-on-mobile { text-align: center !important; }
            }
          `}
        </style>
      </Head>
      <Body style={{
        margin: "0",
        padding: "0",
        backgroundColor: colors.background,
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        color: colors.text,
        WebkitFontSmoothing: "antialiased"
      }}>
        <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ backgroundColor: colors.background }}>
          <tr>
            <td align="center" style={{ padding: "10px" }}>
              <table className="container" cellPadding="0" cellSpacing="0" border={0} style={{
                maxWidth: "600px",
                width: "100%",
                margin: "0 auto"
              }}>
                {/* Header */}
                <tr>
                  <td>
                    <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                      <tr>
                        <td style={{ padding: "30px 40px" }} className="header-padding">
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            <tr>
                              <td>
                                <table cellPadding="0" cellSpacing="0" border={0}>
                                  <tr>
                                    <td style={{
                                      width: "32px",
                                      height: "32px",
                                      borderRadius: "8px",
                                      backgroundColor: colors.primary
                                    }}>
                                      <Text style={{
                                        margin: "0",
                                        color: colors.card,
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        lineHeight: "32px",
                                        textAlign: "center"
                                      }}>
                                        D
                                      </Text>
                                    </td>
                                    <td style={{ paddingLeft: "12px" }}>
                                      <Text style={{
                                        margin: "0",
                                        color: colors.text,
                                        fontWeight: "600",
                                        fontSize: "18px"
                                      }}>
                                        Company Name
                                      </Text>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Main content card */}
                <tr>
                  <td>
                    <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{
                      backgroundColor: colors.card,
                      borderRadius: "16px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      overflow: "hidden"
                    }}>
                      {/* Top accent bar */}
                      <tr>
                        <td style={{ height: "6px", backgroundColor: colors.primary }}></td>
                      </tr>

                      {/* Content area */}
                      <tr>
                        <td style={{ padding: "40px" }} className="mobile-padding">
                          {/* Main heading */}
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "20px" }}>
                            <tr>
                              <td align="center">
                                <Text style={{
                                  fontSize: "24px",
                                  fontWeight: "700",
                                  color: colors.text,
                                  margin: "0",
                                  letterSpacing: "-0.5px"
                                }}>
                                  Email Heading
                                </Text>
                              </td>
                            </tr>
                          </table>

                          {/* Subheading */}
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "35px" }}>
                            <tr>
                              <td align="center">
                                <Text style={{
                                  fontSize: "16px",
                                  fontWeight: "normal",
                                  color: colors.secondaryText,
                                  margin: "0",
                                  lineHeight: "1.5"
                                }}>
                                  Subheading text goes here
                                </Text>
                              </td>
                            </tr>
                          </table>

                          {/* Main content */}
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "30px" }}>
                            <tr>
                              <td>
                                <Text style={{
                                  fontSize: "15px",
                                  color: colors.text,
                                  margin: "0 0 15px 0",
                                  lineHeight: "1.6"
                                }}>
                                  Main content paragraph goes here. You can include whatever information is relevant for your email.
                                </Text>
                                <Text style={{
                                  fontSize: "15px",
                                  color: colors.text,
                                  margin: "0",
                                  lineHeight: "1.6"
                                }}>
                                  Another paragraph of content if needed.
                                </Text>
                              </td>
                            </tr>
                          </table>

                          {/* Action button */}
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "35px" }}>
                            <tr>
                              <td align="center">
                                <table cellPadding="0" cellSpacing="0" border={0}>
                                  <tr>
                                    <td style={{
                                      backgroundColor: colors.primary,
                                      borderRadius: "10px",
                                      overflow: "hidden"
                                    }}>
                                      <Link
                                        href="{ACTION_URL}"
                                        style={{
                                          display: "inline-block",
                                          color: colors.card,
                                          fontSize: "15px",
                                          fontWeight: "600",
                                          textDecoration: "none",
                                          padding: "14px 32px",
                                          letterSpacing: "0.3px"
                                        }}
                                      >
                                        Call To Action
                                      </Link>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          {/* Optional info box */}
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "30px" }}>
                            <tr>
                              <td style={{
                                backgroundColor: "rgba(18, 211, 124, 0.08)",
                                borderRadius: "8px",
                                padding: "15px 20px"
                              }}>
                                <Text style={{
                                  fontSize: "14px",
                                  color: colors.secondaryText,
                                  margin: "0",
                                  lineHeight: "1.5"
                                }}>
                                  Optional information or note that needs to stand out from the rest of the content.
                                </Text>
                              </td>
                            </tr>
                          </table>

                          {/* Divider */}
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "25px" }}>
                            <tr>
                              <td style={{
                                height: "1px",
                                backgroundColor: colors.border,
                                opacity: "0.5"
                              }}></td>
                            </tr>
                          </table>

                          {/* Additional info */}
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            <tr>
                              <td align="center">
                                <Text style={{
                                  fontSize: "14px",
                                  color: colors.secondaryText,
                                  margin: "0",
                                  lineHeight: "1.5",
                                  textAlign: "center"
                                }}>
                                  Additional information or disclaimer text can go here.
                                </Text>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: "30px 20px" }}>
                    <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                      <tr>
                        <td align="center">
                          <Text style={{
                            fontSize: "13px",
                            color: colors.secondaryText,
                            margin: "0",
                            lineHeight: "1.5"
                          }}>
                            © 2024 Company Name, All Rights Reserved.
                            <br />
                            email@example.com • Additional info
                          </Text>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </Body>
    </Html>
  );
}