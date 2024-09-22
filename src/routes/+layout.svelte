<script>
	import "carbon-components-svelte/css/all.css";
	import {
	  Header,
	  SideNav,
	  SideNavItems,
	  SideNavLink,
	  SideNavDivider,
	  SkipToContent,
	  Content,
	} from "carbon-components-svelte";
	import { Fade, Cloud, Map, Warning } from "carbon-icons-svelte";
  
	let isSideNavOpen = false;
</script>

  <Header company="42" platformName="Asia Hackathon" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
	  <SkipToContent />
	</svelte:fragment>
  </Header>
  
  <SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
	  <SideNavLink icon={Fade} text="Welcome" href="/" />
	  <SideNavLink icon={Cloud} text="Weather" href="/weather" />
	  <SideNavLink icon={Map} text="Places to Visit" href="/places" />
	  <SideNavLink icon={Warning} text="In case of emergency" href="/emergency" />
	  <SideNavDivider />
	  <SideNavLink text="Seocho Cluster" href="/cluster/seocho" />
	  <SideNavLink text="Gaepo Cluster" href="/cluster/gaepo" />
	</SideNavItems>
  </SideNav>

  <Content>
	<slot></slot>
  </Content>
  