import News, {
  NewsCard,
  NewsCardDetails,
  NewsCardEffectiveDate,
  NewsCardHeading,
  NewsError,
  NewsLoading,
} from "@/components/main/company/news/news";
import type { serverFn__readAllNewsSchema } from "@/integrations/server-function/news";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { FileRouteTypes } from "@/routeTree.gen";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

function NewsComp() {
  return <News />;
}

const meta: Meta<typeof NewsComp> & TypedMetaOptions = {
  component: NewsComp,

  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      id: "/(with-header-footer)/company/news/" satisfies FileRouteTypes["id"],
      loader: () => ({
        newsData: newsDataData(),
      }),
      component: Story,
    });

    const routeTree = rootRoute.addChildren([route]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/"],
      }),
    });
    return <RouterProvider router={router} />;
  },
};

export default meta;

type Story = StoryObj<typeof NewsComp> & TypedStoryOptions;

export const NewsCompStory: Story = {
  args: {},
};

function NewsCardComp() {
  return (
    <NewsCard>
      <NewsCardEffectiveDate
        effectiveDate={new Date("2027-06-16 00:43:07.860000")}
      />
      <NewsCardHeading>SyntX Automated Engine V3 Rolled Out</NewsCardHeading>
      <NewsCardDetails>
        We've officially launched the third iteration of our SyntX Automated
        indices, resulting in a 40% performance speed boost in execution and
        lower latency on high-frequency bots.
      </NewsCardDetails>
    </NewsCard>
  );
}

export const NewsCardCompStory: Story = {
  args: {},

  render: NewsCardComp,
};

export const NewsCardErrorCompStory: Story = {
  args: {},

  render: () => <NewsError />,
};

export const NewsCardLoadingCompStory: Story = {
  args: {},

  render: () => <NewsLoading />,
};

async function newsDataData() {
  await new Promise((res) => setTimeout(res, 0));
  return [
    {
      id: "01e9924862",
      effectiveDate: new Date("2026-01-03 06:30:41.392000"),
      heading: "Non ait rerum calco.",
      details:
        "Viscus dolorem curis iste spargo testimonium rem cruentus. Ventus non ascit ea capto sponte antiquus. Pauci cognatus consuasor texo adinventitias pecus.\n\nCupio terminatio speculum teneo combibo deporto. Vaco aspicio cilicium aperte ademptio cruentus appello tametsi absens paulatim. Urbanus venustas deprecator.\n\nContabesco architecto veritatis administratio triumphus suscipio atrocitas recusandae stultus aperio. Ventus celo demergo temeritas consequuntur aggredior autem. Somniculosus cras ulterius conservo vulnus baiulus deporto clarus.\n\nTaedium coniuratio confero aro tamquam iusto vetus voluptas veritatis. Vigor admoneo carpo volup ciminatio vilis defetiscor consequuntur. Tolero aggero adeptio calco calamitas atqui aegre.\n\nComburo sto traho. Aperio eos absorbeo voluptatum amoveo. Conduco deprecator facere tres volup cunctatio cogito toties.\n\nSpeculum versus alii utroque subiungo caterva adflicto. Conduco admiratio canonicus sol voveo speciosus arbustum virtus. Cogito bis cunae.",
      createdAt: new Date("2026-06-29 11:49:31.993000"),
      updatedAt: new Date("2026-06-29 11:49:31.993000"),
      tableIdentifierToken: "NEWS",
    },
    {
      id: "03b67a265c",
      effectiveDate: new Date("2026-11-19 11:16:27.696000"),
      heading: "Triumphus amplexus subiungo.",
      details:
        "Compono articulus eos tabgo voro combibo aperte vetus suppono velit. Tum aperiam vinco strenuus civitas supra claudeo vero canto. Maiores validus sapiente textus timor adopto decet addo.\n\nIpsa accusator non concedo comptus. Canis vulgo depono arbustum capitulus verus coerceo adversus. Spiritus deputo suscipit sponte arcesso adopto commemoro defleo iste.\n\nAmo tyrannus varietas carcer cauda amplitudo quod suasoria harum tres. Omnis pectus desidero bellum totam valetudo toties sortitus. Id pariatur tyrannus saepe sui repudiandae debilito attollo.",
      createdAt: new Date("2026-06-29 11:49:31.993000"),
      updatedAt: new Date("2026-06-29 11:49:31.993000"),
      tableIdentifierToken: "NEWS",
    },
  ] satisfies Awaited<ReturnType<typeof serverFn__readAllNewsSchema>>; // [
  //   {
  //     id: "0be68ac046",
  //     effectiveDate: new Date("2026-03-20 07:52:26.519000"),
  //     heading: "Clementia trepide speculum desipio atqui villa.",
  //     details:
  //       "Vivo video copiose ver desipio. Sapiente aggero accommodo. Adopto velit uterque solvo.\nOdio terreo veniam vulgus cognatus odit dedico tyrannus suffoco. Certus venia cognatus amoveo. Censura volo spoliatio adversus aeneus cui vinum.\nPerspiciatis capto impedit eum demonstro harum caries. Cui vae desipio. Bis neque acceptus solum vinco defendo adfero cohors.\nAdaugeo ex minima vomito quasi vorago. Demitto spargo sustineo stella. Speciosus venia tergum attonbitus verbum.\nTimidus color vaco. Cernuus sonitus solium vox vaco coniecto. Atavus ipsum tolero sit molestias vulpes beatus.",
  //     createdAt: new Date("2026-06-29 10:08:35.026000"),
  //     updatedAt: new Date("2026-06-29 10:08:35.026000"),
  //     tableIdentifierToken: "NEWS",
  //   },
  //   {
  //     id: "0fb8deb01f",
  //     effectiveDate: new Date("2027-06-16 00:43:07.860000"),
  //     heading: "Adicio bestia depraedor calcar basium suppono.",
  //     details:
  //       "Tabernus balbus trepide acidus. Adamo surculus candidus via creator admitto maiores. Vere sophismata spiritus possimus voluntarius quasi venia cresco.\nUllam tripudio certe ipsam careo harum arbor capio conicio. Amaritudo vorago aspicio. Conculco trado adimpleo creta studio est cubicularis.\nCensura hic aliquid beatae. Adsum volaticus tersus amitto celebrer beatus cupiditate depulso a suus. Angelus compello solium alienus voluptatibus.\nAbsorbeo tempus creptio ventus ademptio tubineus carmen tactus deripio aegrus. Provident doloribus calco. Barba thema curia cultellus quibusdam agnosco.\nTepesco pauper vitiosus ipsum auctus cometes. Conqueror vereor verbera undique. Ancilla commodo thesis defessus demulceo ex suffragium audio.\nCurriculum acsi tepesco defluo. Copia tego charisma tergum eum umbra bibo. Statim patrocinor sono.",
  //     createdAt: new Date("2026-06-29 10:08:35.026000"),
  //     updatedAt: new Date("2026-06-29 10:08:35.026000"),
  //     tableIdentifierToken: "NEWS",
  //   },
  // ]
}
