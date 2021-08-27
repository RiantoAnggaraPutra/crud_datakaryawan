import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';

import Select from 'react-select';

const handleSingleChange = onChange => value =>
  onChange(value ? value.value : '');
const handleMultiChange = onChange => values =>
  onChange(values.map(value => value.value));

class SelectOption extends React.Component {
  handleClick(event) {
    const { option, onSelect } = this.props;
    onSelect(option, event);
  }

  render() {
    const {
      children,
      option,
      onSelect,
      isFocused,
      isSelected,
      onFocus
    } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={event => onSelect(option, event)}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

SelectOption.propTypes = {
  children: PropTypes.node.isRequired,
  option: PropTypes.object.isRequired,
  onFocus: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired
};

let StyledChip = ({ classes, ...rest }) => (
  <Chip className={classes.root} {...rest} />
);

StyledChip.propTypes = {
  classes: PropTypes.object.isRequired
};

StyledChip = withStyles(theme => ({
  root: {
    margin: theme.spacing.unit / 4
  }
}))(StyledChip);

const SelectValue = ({ value, children, onRemove }) => {
  const handleDelete = event => {
    event.preventDefault();
    event.stopPropagation();
    onRemove(value);
  };

  return onRemove ? (
    <StyledChip
      tabIndex={-1}
      label={children}
      deleteIcon={<CancelIcon onTouchEnd={handleDelete} />}
      onDelete={handleDelete}
    />
  ) : (
    <div className="Select-value">{children}</div>
  );
};

SelectValue.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.object.isRequired,
  children: PropTypes.node,
  onRemove: PropTypes.func
};

const SelectArrow = ({ isOpen }) =>
  isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

SelectArrow.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

const SelectClear = () => <ClearIcon />;

const SelectWrapped = ({
  multiple,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  noResultsText,
  ...rest
}) => (
  <Select
    multi={multiple}
    optionComponent={SelectOption}
    noResultsText={
      <Typography>{noResultsText || 'No results found'}</Typography>
    }
    placeholder={placeholder || ''}
    arrowRenderer={SelectArrow}
    clearRenderer={SelectClear}
    valueComponent={SelectValue}
    onBlur={() => onBlur(undefined)}
    onFocus={onFocus}
    onChange={
      multiple ? handleMultiChange(onChange) : handleSingleChange(onChange)
    }
    {...rest}
  />
);

SelectWrapped.propTypes = {
  multiple: PropTypes.bool,
  noResultsText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

const FormAutocompleteSelect = ({
  input: { onChange, value, onFocus, onBlur },
  label,
  id,
  fullWidth,
  required,
  disabled,
  margin,
  multiple,
  meta: { touched, error, active },
  ...rest
}) => (
  <FormControl
    fullWidth={fullWidth}
    required={required}
    error={Boolean(error)}
    disabled={disabled}
    margin={margin}
  >
    <InputLabel
      htmlFor={id}
      shrink={(multiple ? value.length > 0 : Boolean(value)) || active}
    >
      {label}
    </InputLabel>
    <Input
      inputComponent={SelectWrapped}
      inputProps={{
        id,
        multiple,
        value,
        onChange,
        onFocus,
        onBlur,
        ...rest
      }}
    />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

FormAutocompleteSelect.propTypes = {
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  autoWidth: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  id: PropTypes.string,
  margin: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const ITEM_HEIGHT = 48;

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 4
  },
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none'
      }
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap'
    },
    '.Select--multi .Select-input': {
      margin: 0
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto'
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none'
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto'
    },
    '.Select-menu div': {
      boxSizing: 'content-box'
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1
    },
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1
    }
  }
});
     
export default withStyles(styles)(FormAutocompleteSelect);