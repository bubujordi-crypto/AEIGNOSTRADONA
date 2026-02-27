import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function cleanDuplicates() {
  console.log("Buscant i netejant pàgines duplicades...\n");

  // Fetch all pages
  const allPages = await client.fetch(`*[_type == "paginaContingut"]{_id, slug, title}`);
  
  // Group by slug
  const pagesBySlug: Record<string, any[]> = {};
  for (const page of allPages) {
    if (!page.slug) continue;
    if (!pagesBySlug[page.slug]) pagesBySlug[page.slug] = [];
    pagesBySlug[page.slug].push(page);
  }

  // Find duplicates and delete the ones that don't match our preferred ID format "paginaContingut-<slug>"
  let deletedCount = 0;

  for (const [slug, pages] of Object.entries(pagesBySlug)) {
    if (pages.length > 1) {
      console.log(`Trobat ${pages.length} documents per al slug: ${slug}`);
      
      const preferredId = `paginaContingut-${slug}`;
      let hasPreferredId = pages.some(p => p._id === preferredId || p._id === `drafts.${preferredId}`);

      for (const page of pages) {
        // If we have multiple and this one is an auto-generated one (no "paginaContingut-" prefix)
        // or if it's the second document and we haven't found the preferred one yet
        if (!page._id.includes("paginaContingut-") && hasPreferredId) {
          console.log(`  Esborrant document duplicat: ${page._id} (${page.title})`);
          await client.delete(page._id);
          
          // Also try to delete drafts just in case
          if (!page._id.startsWith("drafts.")) {
            try {
              await client.delete(`drafts.${page._id}`);
            } catch (e) {
              // Ignore if draft doesn't exist
            }
          }
          deletedCount++;
        }
      }
    }
  }

  if (deletedCount === 0) {
    console.log("No s'han trobat duplicats que calgui esborrar.");
  } else {
    console.log(`\n✅ S'han esborrat ${deletedCount} documents duplicats.`);
  }
}

cleanDuplicates().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
