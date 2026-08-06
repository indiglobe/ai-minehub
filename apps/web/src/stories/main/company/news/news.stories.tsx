import News from "@/components/main/company/news/news";
import type { serverFn__readAllNewsSchema } from "@/integrations/server-function/news";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(with-header-footer)/company/news/index";

const SLEEP = 1000 * 2;

const meta = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        routeOverrides: {
          "/(with-header-footer)/company/news/": {
            loader: () => {
              return { newsData: newsDataData() };
            },
          },
        },
      },
    },
  },
} satisfies Meta<typeof Route> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof News> & TypedStoryOptions;

export const NewsStory: Story = {
  args: {},
  render: News,
};

async function newsDataData() {
  await new Promise((res) => setTimeout(res, SLEEP));
  const random = Math.random();

  if (random < 0.7) {
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
    ] satisfies Awaited<ReturnType<typeof serverFn__readAllNewsSchema>>;
  }

  throw new Error();
}
