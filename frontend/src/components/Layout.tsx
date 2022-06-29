import classes from './Layout.module.scss';

interface Props {
	children: React.ReactNode;
}
function Layout({ children }: Props) {
	return <main className={classes.container}>{children}</main>;
}

export default Layout;
