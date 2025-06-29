import classNames from "classnames";
import PropTypes from "prop-types";

const ActionButton = ({
  children,
  onClick,
  type = "primary",
  size = "md",
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  className = "",
  ...props
}) => {
  const typeClasses = {
    primary: "btn-main",
    edit: "btn-editar",
    delete: "btn-desactivar",
  };

  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        "btn-spacing",
        typeClasses[type],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <>
          {iconLeft && <span className="me-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ms-2">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["primary", "edit", "delete"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  className: PropTypes.string,
};

export default ActionButton;
