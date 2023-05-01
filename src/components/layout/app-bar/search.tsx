import { alpha, styled } from '@mui/material';
import { InputBase } from '@mui/material';
import { green } from '@mui/material/colors';

export const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(green[50], 0.25),
	'&:hover': {
		backgroundColor: alpha(green[50], 0.75),
		border: `2px solid ${green[100]}`,
	},
	'&:active': {
		backgroundColor: alpha(green[50], 0.5),
	},
	border: `1px solid ${green[100]}`,
	marginRight: 0,
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: 0,
		width: 'auto',
	},
	transition: '600ms ease-in-out',

	display: 'flex',
	flexDirection: 'row',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: '600ms ease-in-out',
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: 'auto',
	flexGrow: 1,
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		// [theme.breakpoints.up('md')]: {
		// 	maxWidth: '50ch',
		// },
	},

	transition: '600ms ease-in-out',
}));
