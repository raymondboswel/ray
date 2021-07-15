<script>
    import { assets} from "$app/paths";
    import { draw, fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
import { onMount } from "svelte";
    let show = false;
    let show1 = false;
    let duration = 1000;
    let delay = 200;
    let showHi = false;
    let showText = false;
    onMount(() => {
        setTimeout(() => show = true, 500);
        setTimeout(() => show1 = true, 2000);
		    setTimeout(() => {
          showHi = true; 
          setTimeout(() => {
            showHi = false
            setTimeout(() => {
              showText = true;
            }, 1500)
          }, 2000)}
          ,300)
    })

</script>

{#if show}
<article class="h-full w-full">
    <div class="flex justify-between items-center mx-20">
        <img transition:fly="{{delay: 300, duration: 400, x: -500, y: 0, opacity: 1, easing: quintOut}}"  src="{assets}/logo.png" alt=""/>
        <img alt="" transition:fly="{{delay: 0, duration: 400, x: 200, y: 0, opacity: 1, easing: quintOut}}" class="h-20 w-20 rounded-full" src="{assets}/beer_hat_l.jpg" />
    </div>
    
    <section class="flex justify-end ml-20 mr-10">
        <div class="flex-grow flex flex-col ">
            {#if showHi} 
            <svg class="absolute top-1 -right-24 " out:scale="{{duration: 1500, delay: 0, start: 0, easing: quintOut}}" width="200" height="100">
                <g>
                    <path in:draw="{{duration, delay}}"
                    id="path292"
                    d="m 17.090835,23.363606 c 2.465195,-1.785133 5.332672,-2.964905 8.129471,-4.132959 0.343392,-0.123729 0.681731,-0.262501 1.030176,-0.371186 1.040019,-0.324398 0.864495,0.08069 0.100886,-0.08275 -0.175967,-0.03766 -0.314198,-0.252815 -0.491659,-0.222972 -0.10095,0.01699 -0.0053,0.20466 -0.008,0.306991 0.458089,3.73793 0.182166,7.502696 -0.155083,11.236184 -0.672234,6.636184 -1.744654,13.224374 -2.827795,19.803514 -1.148194,7.2976 -1.805088,14.65635 -2.374229,22.01756 -0.177299,2.32435 -0.293521,4.65242 -0.40111,6.98078 -0.159459,3.45548 4.727326,3.68099 4.886786,0.22551 v 0 c 0.104973,-2.27785 0.218503,-4.55541 0.391765,-6.82935 0.557858,-7.22141 1.199756,-14.4406 2.323817,-21.59994 1.102257,-6.69746 2.192573,-13.40427 2.873116,-20.16017 0.386186,-4.317553 0.713878,-8.704098 -0.01005,-13.005911 -0.455621,-1.321125 -0.514906,-2.099191 -1.784234,-3.00178 -1.710028,-1.215961 -3.723915,-0.468416 -5.441696,0.190251 -3.278861,1.372714 -6.6339,2.776112 -9.462764,4.96393 -2.603779,2.277301 0.61681,5.959602 3.22059,3.682302 z"
                    style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#435db0;stroke-width:2.5;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                 <path transition:draw="{{duration, delay}}"
                    id="path294"
                    d="m 46.840886,15.149219 c 0.06575,3.383966 -0.192299,6.756448 -0.495525,10.123514 -0.762664,7.403275 -1.544889,14.804505 -2.306444,22.207935 -0.796327,7.87381 -1.54977,15.75251 -2.115296,23.64658 -0.235839,3.44702 -0.382175,6.89917 -0.461793,10.35307 -0.07949,3.45824 4.811202,3.57066 4.890693,0.11242 v 0 c 0.07735,-3.37486 0.220633,-6.74798 0.450596,-10.11613 0.561237,-7.84365 1.311518,-15.67185 2.102107,-23.49537 0.763706,-7.42431 1.548606,-14.84639 2.312492,-22.270654 0.315016,-3.512669 0.581017,-7.03127 0.515157,-10.561365 0,-3.459157 -4.891987,-3.459157 -4.891987,0 z"
                    style="fill:none;fill-opacity:1;stroke:#435db0;stroke-width:2.165;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                 <path transition:draw="{{duration, delay}}"
                    id="path296"
                    d="m 31.840779,54.132258 c 1.764988,-0.28872 3.550877,-0.41106 5.335098,-0.50333 0.848915,-0.0414 1.698582,-0.0616 2.548321,-0.0749 3.458723,-0.0548 3.381161,-4.94622 -0.07756,-4.89137 v 0 c -0.908539,0.0145 -1.817002,0.0363 -2.724647,0.0809 -1.995895,0.1042 -3.993499,0.24605 -5.966603,0.57752 -3.402031,0.62607 -2.516635,5.43727 0.885394,4.8112 z"
                    style="fill:none;fill-opacity:1;stroke:#435db0;stroke-width:1.665;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                 <path transition:draw="{{duration, delay}}" 
                    id="path298"
                    d="m 60.525215,51.374298 c 0,2.23552 0,4.47105 0,6.70657 0,2.9384 0,5.87679 0,8.81518 0,1.90015 0,3.80031 0,5.70046 0.05162,1.50473 0.255252,2.99743 0.431155,4.49103 0.404601,3.43541 5.263009,2.86322 4.858411,-0.57219 v 0 c -0.15358,-1.30402 -0.331025,-2.60653 -0.397579,-3.91884 0,-1.90015 0,-3.80031 0,-5.70046 0,-2.93839 0,-5.87678 0,-8.81518 0,-2.23552 0,-4.47105 0,-6.70657 0,-3.45916 -4.891987,-3.45916 -4.891987,0 z"
                    style="fill:none;fill-opacity:1;stroke:#435db0;stroke-width:2.365;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                 <circle transition:draw="{{duration, delay}}"
                    id="path300"
                    style="fill:#000000;stroke:#000000;stroke-width:0.264583"
                    cx="60.561207"
                    cy="38.036858"
                    r="0.17197479" />
                 <circle transition:draw="{{duration, delay}}"
                    id="path302"
                    style="fill:#000000;stroke:#000000;stroke-width:0.264583"
                    cx="60.561207"
                    cy="38.036858"
                    r="0.17197479" />
                 <path transition:draw="{{duration, delay}}"
                    id="path304"
                    d="m 63.053714,34.051746 c -1.131102,0.761015 -2.182813,1.617863 -3.104195,2.622692 -0.660313,0.84351 -1.246169,1.87941 -1.283671,2.98369 -0.01233,0.36333 0.03005,0.72646 0.04508,1.08969 0.104105,0.35551 0.170929,0.72414 0.312322,1.06654 0.492061,1.19157 1.423469,2.3175 2.479159,3.04649 0.286949,0.19815 0.604105,0.34852 0.906158,0.52279 1.514689,0.6577 3.129616,1.04275 4.752494,0.51649 0.358584,-0.11628 0.688088,-0.30814 1.032131,-0.46221 1.422837,-0.89941 2.827491,-2.18534 3.21223,-3.90825 0.0946,-0.42365 0.08535,-0.86396 0.128021,-1.29594 -0.08443,-0.42407 -0.103688,-0.86652 -0.25328,-1.2722 -0.750113,-2.03427 -2.744833,-2.997919 -4.603965,-3.780226 -1.356891,-0.354621 -0.67206,-0.246234 -2.053658,-0.330433 -3.459118,-0.01659 -3.482571,4.875349 -0.02344,4.891929 v 0 c -0.06082,-0.12933 -0.04852,-0.0595 0.208806,-0.0403 0.600438,0.24109 0.573807,0.21571 1.158518,0.51064 0.146015,0.0736 0.280336,0.17148 0.432186,0.2322 0.04124,0.0165 0.09929,0.0226 0.133086,-0.006 0.07661,-0.0653 -7.94e-4,-0.22972 0.110357,-0.2811 0.404186,-0.50601 -0.325019,0.92562 -0.61891,0.89556 -0.05642,0.0442 -0.123862,0.077 -0.169252,0.13243 -0.01669,0.0204 0.03507,0.1314 -0.04518,0.12952 -0.36815,-0.009 -0.730486,-0.16261 -1.08534,-0.24157 -0.490397,-0.19084 -0.660199,-0.44116 -0.994957,-0.84073 -0.0865,-0.10324 -0.08417,-0.0794 -0.155993,-0.0309 -0.151022,0.32958 -0.06164,-0.21039 0.01889,-0.26158 0.535665,-0.62897 1.211874,-1.09257 1.842783,-1.61523 3.022034,-1.683175 0.641665,-5.956979 -2.380369,-4.273803 z"
                    style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#435db0;stroke-width:1.965;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              </g>
            </svg>
            {/if}
            {#if showText}
              <p class="mr-4 text-gray-700" transition:scale="{{delay: 0, duration: 400, start: 0, opacity: 1, easing: quintOut}}">
                Hi there! I am a software engineer from Pretoria, South Africa. I mainly work as a frontend 
                engineer at Fastcomm, and also lead a really great team. We mostly build projects in Angular and Elixir,
                though I'm really excited about Svelte as well these days (which is what this little site is built in). 
              </p>

              <p class="mr-4 my-2 text-gray-700" transition:scale="{{delay: 800, duration: 400, start: 0, opacity: 1, easing: quintOut}}">
                At Fastcomm I'm the organizer of the Angular/Web guild, and regularly contribute content and presentations, with topics 
                ranging from Angular performance pitfalls and optimizations, to more general topics such as Functional Programming principles.
              </p>              
              <p class="mr-4 text-gray-700" transition:scale="{{delay: 800, duration: 400, start: 0, opacity: 1, easing: quintOut}}">
                When I'm not programming, I like to get outdoors and ride my mountain bike, go climb some rocks or hang out with my amazing wife.
              </p>   
            {/if}
        </div>
        <div class="font-bold flex flex-col justify-between" >
            <span transition:fly="{{delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}" class="menu-item mb-2">
                About
            </span>
            <span transition:fly="{{delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}" class="menu-item mb-2">
                Career
            </span>
            <span transition:fly="{{delay: 600, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}" class="menu-item mb-2">
                Programming
            </span>
            <span transition:fly="{{delay: 700, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}" class="menu-item mb-2">
                Interests
            </span>
        </div>
    </section>
</article>

{/if}
<style>

    .menu-item {
        border:solid 3px rgb(4, 97, 174);
    }    

    span {           
        cursor: pointer;
        color: white;
        border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
        padding:1em;
        line-height:1.5em;
        background:rgb(19, 101, 179);
    }

    path {
        stroke: black;
        fill: white;
    }
</style>