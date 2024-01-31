import { render, screen, fireEvent } from "@testing-library/react";
import AlertDialog from "../index";

describe("AlertDialog", () => {
  test("renders with correct title and content text", () => {
    const title = "Confirmation";
    const contentText = "Are you sure you want to proceed?";

    render(
      <AlertDialog
        open={true}
        handleClose={() => {}}
        handleOk={() => {}}
        title={title}
        contentText={contentText}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(contentText)).toBeInTheDocument();
  });

  test("calls handleOk when Ok button is clicked", () => {
    const handleOkMock = jest.fn();

    render(
      <AlertDialog
        open={true}
        handleClose={() => {}}
        handleOk={handleOkMock}
        title=""
        contentText=""
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Ok" }));

    expect(handleOkMock).toHaveBeenCalled();
  });

  test("does not render Disagree button when showDisagree is false", () => {
    render(
      <AlertDialog
        open={true}
        handleClose={() => {}}
        handleOk={() => {}}
        title=""
        contentText=""
        showDisagree={false}
      />
    );

    expect(screen.queryByRole("button", { name: "Disagree" })).toBeNull();
  });

  test("renders Disagree button when showDisagree is true", () => {
    render(
      <AlertDialog
        open={true}
        handleClose={() => {}}
        handleOk={() => {}}
        title=""
        contentText=""
        showDisagree={true}
      />
    );

    expect(screen.getByRole("button", { name: "Disagree" })).toBeInTheDocument();
  });
});